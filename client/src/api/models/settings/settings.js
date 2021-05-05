import {api} from 'api/api.js';

var SettingsApi = api.createModel('system-settings');

SettingsApi.types = () => {
    return SettingsApi.getAll({}, 'types')
}

export default SettingsApi;