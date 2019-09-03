export const environment = {
  production: true,
  api: {
    protocol: 'http',
    host: 'localhost:8081',
    get url() {
      return `${this.protocol}://${this.host}/api`;
    }
  }
};
