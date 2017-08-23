exports = module.exports = function(requireSession, app, controllers, modules) {

  app.post('/layout/share', controllers.layout.share);

  /**
 * @swagger
 * /layout/listPublic:
 *   get:
 *     description: Get list public layouts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: Page
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Get list public layouts
 */
  app.get('/layout/listPublic', controllers.layout.listPublic);
}
