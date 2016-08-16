
export default class HttpPlugin {

    constructor(client) {
        this.name = 'HTTPPlugin';
        this.client = client;
    }

    plugContext() {
        return {
            plugActionContext: (actionContext) => {
                actionContext.http = this.getClient();
            }
        };
    };

    getClient() {
        return this.client;
    }

}

export default HttpPlugin;
