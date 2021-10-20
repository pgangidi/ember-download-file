import CONFIG from '../utils/global-constants';

export default function() {
  const apiConfig = CONFIG.apiConfig;
  const url = `${apiConfig.hostURL}${apiConfig.namespace}${apiConfig.fileListAPIURL}`;

  this.get(url, (schema) => {
    return schema.files.all().models;
  })
}
