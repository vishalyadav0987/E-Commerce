const sendTokenInCookie = (user, statusCode, res,message) => {
    const token = user.generateToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res
      .status(statusCode)
      .cookie("token", token, options)
      .json({
        success: true,
        user,
        token,
        message
      });
  };
  
  module.exports = sendTokenInCookie;