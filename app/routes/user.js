exports = module.exports = function(requireSession, app, controllers, modules) {
  /**
 * @swagger
 * /user/facebook:
 *   post:
 *     description: Sign in / Connect to facebook
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: fbId
 *         description: User's facebook id
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Sign in / Connect to facebook
 */
  app.post('/user/facebook', controllers.user.loginFB);
}
