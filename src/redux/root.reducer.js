import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import menuReducer from './menu/menu.reducer';
import attendanceReducer from './attendance/attendance.reducer';
import studentsClassReducer from './students-class/students-class.reducer';

const rootReducer = combineReducers(
  {
    user: userReducer,
    menu: menuReducer,
    attendance: attendanceReducer,
    studentsClass: studentsClassReducer,
  },
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
