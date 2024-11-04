import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import Usuarios from '../database/usuario.js';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'tu_secreto_jwt'
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
	// console.log('JWT Payload:', jwt_payload); 
	try {
		const user = new Usuarios()
		const usuario = await user.obtenerPorId(jwt_payload.id);
		// console.log(usuario)
		if (usuario) {
			return done(null, usuario);
		} else {
			return done(null, false);
		}
	} catch (error) {
		return done(error, false);
	}
}));

export default passport;
