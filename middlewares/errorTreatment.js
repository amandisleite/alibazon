const UserAlreadyExists = require('../errors/UserAlreadyExists');

module.exports = (err, req, res, next) => {
    let status = 500;
  
    // if (err instanceof RegistroNaoExiste ||
    //     err instanceof RegistroJaExiste ||
    //     err instanceof RegistroJaCriado ||
    //     err instanceof RegistroPraAtualizarJaCriado ||
    //     err instanceof EmailSenhaInvalidos) {
    //   status = 404;
    // }
  
    if (err instanceof UserAlreadyExists) {
      status = 400;
    }
    console.log(req.path)
    res.status(status);
    res.render(`${req.path.substring(1)}`, {
      errMessage: err.message,
      errId: err.errId,
      errName: err.name
    });
  };