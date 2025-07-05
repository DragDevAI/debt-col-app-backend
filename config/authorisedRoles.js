module.exports = {
  "GET /account/": ["admin"],
  "GET /account/:id": ["admin", "user"],
  "PUT /account/:id": ["admin"],
  "DELETE /account/:id": ["admin"],

  "GET /banner/": ["admin", "user", "guest"],
  "GET /banner/getId/:size": ["admin", "user", "guest"],
  "GET /banner/getData/:id": ["admin", "user", "guest"],
  "POST /banner/": ["admin"],
  "PUT /banner/updateData/:id": ["admin"],
  "DELETE /banner/deleteData/:id": ["admin"],

  "GET /collector/": ["admin", "user", "guest"],
  "GET /collector/getId/:name": ["admin", "user", "guest"],
  "GET /collector/getData/:id": ["admin", "user", "guest"],
  "POST /collector/": ["admin"],
  "PUT /collector/updateData/:id": ["admin"],
  "DELETE /collector/deleteData/:id": ["admin"],

  "GET /paint/": ["admin", "user", "guest"],
  "GET /paint/getId/:location": ["admin", "user", "guest"],
  "GET /paint/getData/:id": ["admin", "user", "guest"],
  "POST /paint/": ["admin"],
  "PUT /paint/updateData/:id": ["admin"],
  "DELETE /paint/deleteData/:id": ["admin"],

  "GET /language/": ["admin", "user", "guest"],
  "GET /colour/": ["admin", "user", "guest"],

  "GET /cart/": ["admin", "user"],
  "GET /cart/getId/:userID": ["admin", "user"],
  "GET /cart/:id": ["admin", "user"],
  "POST /cart/": ["admin", "user"],
  "PUT /cart/:id/add": ["admin", "user"],
  "PUT /cart/:id/remove": ["admin", "user"],
  "PUT /cart/:id/pay": ["admin", "user"],
  "DELETE /cart/:id": ["admin", "user"],

};