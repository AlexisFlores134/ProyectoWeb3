import Auth from './Auth'
import AuthController from './AuthController'
import TarjetaRfidController from './TarjetaRfidController'
import AccesoController from './AccesoController'
import Settings from './Settings'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
AuthController: Object.assign(AuthController, AuthController),
TarjetaRfidController: Object.assign(TarjetaRfidController, TarjetaRfidController),
AccesoController: Object.assign(AccesoController, AccesoController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers