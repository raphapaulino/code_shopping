<?php
declare(strict_types=1);

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class ProductPhoto extends Model
{
    const BASE_PATH     = 'app/public';
    const DIR_PRODUCTS  = 'products';
    const PRODUCTS_PATH = self::BASE_PATH . '/' . self::DIR_PRODUCTS;

    protected $fillable = [
        'file_name', 
        'product_id'
    ];

    public static function photosPath($productId)
    {
        $path = self::PRODUCTS_PATH;
        return storage_path("{$path}/{$productId}");
    }

    public static function createWithPhotosFiles(int $productId, array $files): Collection
    {
        /** 
         * o commit padrão do MySql (autocommit padrão) pode ser desabilitado 
         * autocommit é implícito, com o \DB::beginTransaction() ... \DB::commit(); deixamos explícito
         * 
         * Dica: Dica: Para edição da imagem não use o método PUT, pois o PHP não suporta envio de arquivos com método PUT, use o POST.
         * */
        try {

            self::uploadFiles($productId, $files);
            \DB::beginTransaction();
            $photos = self::createPhotosModels($productId, $files);
            // throw new \Exception('lancando exceção');
            \DB::commit();
            // 2 deram certo e o 3 nao
            return new Collection($photos);

        } catch (\Exception $e) {

            self::deleteFiles($productId, $files);
            \DB::rollBack();
            throw $e;

        }
    }

    public function updateWithPhoto(UploadedFile $file): ProductPhoto
    {
        /** desabilitar o commit padrão do MySql (autocommit) */
        try {

            /**
             * @TODO Pegar o caminho da imagem atual, jogar para um diretório temporário,
             * para o caso onde ocorra algum problema com o banco de dados após o beginTransaction()
             * ser executado, o registro não ficar sem o arquivo "físico" no servidor. Então
             * o copiamos de volta.
             * 
             * Usar: \File::copy() / sys_get_temp_dir()
             */
            
            // do the upload
            self::uploadFiles($this->product_id, [$file]);
            \DB::beginTransaction();
            // remove old file
            $this->deletePhoto($this->file_name); // TODO: gerar uma cópia temporária da imagem com \File::copy(sys_get_temp_dir()) e salva o caminho para poder recuperar depois
            // update old file name
            $this->file_name = $file->hashName();
            $this->save();
            \DB::commit();
            // 2 deram certo e o 3 nao
            return $this;

        } catch (\Exception $e) {

            // remove old file
            self::deleteFiles($this->product_id, [$file]);
            \DB::rollBack();
            throw $e;

        }
    }

    public function deleteWithPhoto(): bool
    {
        try {

            \DB::beginTransaction();
            $this->deletePhoto($this->file_name);
            $result = $this->delete();
            \DB::commit();
            return $result;

        } catch (\Exception $e) {

            \DB::rollBack();
            throw $e;

        }
    }

    private function deletePhoto($fileName)
    {
        $dir = self::photosDir($this->product_id);
        \Storage::disk('public')->delete("{$dir}/{$fileName}");
    }

    private static function deleteFiles(int $productId, array $files) 
    {
        /** @var UploadedFile $file */
        foreach ($files as $file) {
            $path = self::photosPath($productId);
            $photoPath = "{$path}/{$file->hashName()}";
            if (file_exists($photoPath)) {
                \File::delete($photoPath);
            }
        }
    }

    public static function uploadFiles(int $productId, array $files)
    {
        $dir = self::photosDir($productId);
        /** @var UploadedFile $file */
        foreach ($files as $file) {
            $file->store($dir, ['disk' => 'public']);
        }
    }

    private static function createPhotosModels(int $productId, array $files): array
    {
        $photos = [];
        /** @var UploadedFile $file */
        foreach ($files as $file) {
            $photos[] = self::create([
                'file_name' => $file->hashName(),
                'product_id' => $productId
            ]);
        }
        return $photos;
    }

    private static function updatePhotosModels(int $productId, array $files): array
    {
        $photos = [];
        /** @var UploadedFile $file */
        foreach ($files as $file) {
            # code...
            $photos[] = self::create([
                'file_name' => $file->hashName(),
                'product_id' => $productId
            ]);
        }
        return $photos;
    }

    public function getPhotoUrlAttribute() // accessor
    {
        $path = self::photosDir($this->product_id);
        return asset("storage/{$path}/{$this->file_name}");
    }

    public static function photosDir($productId)
    {
        $dir = self::DIR_PRODUCTS;
        return "{$dir}/{$productId}";
    }

    public function product()
    {
        return $this->belongsTo(Product::class)->withTrashed();
    }
}
