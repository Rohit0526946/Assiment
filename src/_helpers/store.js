import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import { persistStore, persistReducer } from 'redux-persist';
// const loggerMiddleware = createLogger();
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'users',
    storage: AsyncStorage,
    whitelist: ['users'] // which reducer want to store
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    pReducer,
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    )
);


const persistor = persistStore(store);

export { persistor, store };