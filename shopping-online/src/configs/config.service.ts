import * as FS from 'fs-extra';
import * as Path from 'path';

export class ConfigService {

    private config: any;

    constructor() {
        this.config = {
        DATABASE: FS.readJSONSync(Path.resolve(__dirname, '..', '..', 'etc', 'configs', 'database.config.json'))
        };
    }

    getJSON(key: string): any {
        return this.config[key];
    }
}