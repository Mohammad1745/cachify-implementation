import { notify } from "../../utilities/notification";
import {store} from "../../redux/store";
import randomJokesRepository from "../../repositories/randomJokes/randomJokesRepository";
import {randomJokesListAction} from "../../redux/slicer/randomJokes/RandomJokesSlicer";

const randomJokesService = {
    getList: async (skipApiCall=true) => {
        const res = await randomJokesRepository.getList( randomJokesService.syncList, skipApiCall);
        if (res) {
            randomJokesService.syncList(res);
        }
    },
    syncList: (res) => {
            //save data in redux
        store.dispatch(randomJokesListAction.setData(res));
    },
}

export default randomJokesService;