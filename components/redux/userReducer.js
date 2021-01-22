import { NAME_PLACE_CREATE, NAME_PLACE_ADD } from './userAC';

const initState={

  // ключ - идентификатор счётчика, значение - число нажатий
  userName: {},

}

// в редьюсере state - это не весь state Redux, а только тот раздел state,
// за который отвечает данный редьюсер

function countersReducer(state=initState,action) {
  switch (action.type) {

    case NAME_PLACE_CREATE: {
      // надо создать новый счётчик
      // редьюсер ВСЕГДА должен возвращаеть новый state а не изменять старый!
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      let newState={...state,
        userName:{...state.userName,
          'name': '',
          'surname': '',
          'age': ''
        }
      };
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }
    
    case NAME_PLACE_ADD: {
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      let newState={...state,
        userName:{...state.userName,
          'name':action.addedName || 'Error',
          'surname':action.addedSurname || 'Error',
          'age':action.age
        }
      };
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }

    default:
      return state;
  }
}

export default countersReducer;
