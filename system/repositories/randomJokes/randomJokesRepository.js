import {handleError, request} from "../../utilities/api";

const randomJokesRepository = {
    getList:  async (callback,skipApiCall=true) => {
        const res = await request({
            axiosConfig:{
                method: "GET",
                url: `https://official-joke-api.appspot.com/jokes/ten`,
            },
            cacheConfig:{
                key: `jokes/ten`,
                errorCallback: handleError,
                // encryption: {
                //     secretKey: "asdsafasfds3242"
                // },
                postSync: {
                    callback,
                    skipApiCallFor: skipApiCall ? '3m' : null,
                    syncTimeout: 1,
                    syncInterval: "1h"
                }
            }

        });
        return res ?? null;
    },
}

export default randomJokesRepository;