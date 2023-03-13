"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/pets";
exports.ids = ["pages/api/pets"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "(api)/./src/models/pet.model.ts":
/*!*********************************!*\
  !*** ./src/models/pet.model.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PetModel\": () => (/* binding */ PetModel)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nclass PetModel {\n    static listPets() {\n        return prisma.pet.findMany();\n    }\n    static createPet(data) {\n        return prisma.pet.create({\n            data\n        });\n    }\n    static retrievePet(id) {\n        return prisma.pet.findUnique({\n            where: {\n                id\n            }\n        });\n    }\n    static updatePet(id, data) {\n        return prisma.pet.update({\n            where: {\n                id\n            },\n            data\n        });\n    }\n    static deletePet(id) {\n        return prisma.pet.delete({\n            where: {\n                id\n            }\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvbW9kZWxzL3BldC5tb2RlbC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBa0Q7QUFHbEQsTUFBTUMsU0FBUyxJQUFJRCx3REFBWUE7QUFFeEIsTUFBTUU7SUFDVCxPQUFjQyxXQUFXO1FBQ3JCLE9BQU9GLE9BQU9HLEdBQUcsQ0FBQ0MsUUFBUTtJQUM5QjtJQUVBLE9BQWNDLFVBQVVDLElBQVMsRUFBRTtRQUMvQixPQUFPTixPQUFPRyxHQUFHLENBQUNJLE1BQU0sQ0FBQztZQUFFRDtRQUFLO0lBQ3BDO0lBRUEsT0FBY0UsWUFBWUMsRUFBVSxFQUFFO1FBQ2xDLE9BQU9ULE9BQU9HLEdBQUcsQ0FBQ08sVUFBVSxDQUFDO1lBQUVDLE9BQU87Z0JBQUVGO1lBQUc7UUFBRTtJQUNqRDtJQUVBLE9BQWNHLFVBQVVILEVBQVUsRUFBRUgsSUFBa0IsRUFBRTtRQUNwRCxPQUFPTixPQUFPRyxHQUFHLENBQUNVLE1BQU0sQ0FBQztZQUFFRixPQUFPO2dCQUFFRjtZQUFHO1lBQUdIO1FBQUs7SUFDbkQ7SUFFQSxPQUFjUSxVQUFVTCxFQUFVLEVBQUU7UUFDaEMsT0FBT1QsT0FBT0csR0FBRyxDQUFDWSxNQUFNLENBQUM7WUFBRUosT0FBTztnQkFBRUY7WUFBRztRQUFFO0lBQzdDO0FBQ0osQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL215LWFwcC8uL3NyYy9tb2RlbHMvcGV0Lm1vZGVsLnRzPzhjNGYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50LCBQZXQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIlxuXG5cbmNvbnN0IHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKVxuXG5leHBvcnQgY2xhc3MgUGV0TW9kZWwge1xuICAgIHB1YmxpYyBzdGF0aWMgbGlzdFBldHMoKSB7XG4gICAgICAgIHJldHVybiBwcmlzbWEucGV0LmZpbmRNYW55KClcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVBldChkYXRhOiBQZXQpIHtcbiAgICAgICAgcmV0dXJuIHByaXNtYS5wZXQuY3JlYXRlKHsgZGF0YSB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmV0cmlldmVQZXQoaWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gcHJpc21hLnBldC5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQgfSB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdXBkYXRlUGV0KGlkOiBudW1iZXIsIGRhdGE6IFBhcnRpYWw8UGV0Pikge1xuICAgICAgICByZXR1cm4gcHJpc21hLnBldC51cGRhdGUoeyB3aGVyZTogeyBpZCB9LCBkYXRhIH0pXG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBkZWxldGVQZXQoaWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gcHJpc21hLnBldC5kZWxldGUoeyB3aGVyZTogeyBpZCB9IH0pXG4gICAgfVxufSJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJQZXRNb2RlbCIsImxpc3RQZXRzIiwicGV0IiwiZmluZE1hbnkiLCJjcmVhdGVQZXQiLCJkYXRhIiwiY3JlYXRlIiwicmV0cmlldmVQZXQiLCJpZCIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsInVwZGF0ZVBldCIsInVwZGF0ZSIsImRlbGV0ZVBldCIsImRlbGV0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/models/pet.model.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/pets/index.ts":
/*!*************************************!*\
  !*** ./src/pages/api/pets/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _services_pet_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/pet.service */ \"(api)/./src/services/pet.service.ts\");\n// Next.js API route support: https://nextjs.org/docs/api-routes/introduction\n\nasync function handler(req, res) {\n    try {\n        if (req.method !== \"GET\") throw new Error(`Forbidden request method: ${req.method}`);\n        const pets = await _services_pet_service__WEBPACK_IMPORTED_MODULE_0__.PetService.listPets();\n        res.status(200).json(pets);\n    } catch (error) {\n        if (error instanceof Error) {\n            res.status(500).send({\n                error: error.message\n            });\n            return;\n        }\n        console.error(error);\n        res.status(500).send({\n            error: \"Internal server error\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL3BldHMvaW5kZXgudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw2RUFBNkU7QUFHekI7QUFFckMsZUFBZUMsUUFDMUJDLEdBQW1CLEVBQ25CQyxHQUF3RCxFQUMxRDtJQUNFLElBQUk7UUFDQSxJQUFJRCxJQUFJRSxNQUFNLEtBQUssT0FBTyxNQUFNLElBQUlDLE1BQU0sQ0FBQywwQkFBMEIsRUFBRUgsSUFBSUUsTUFBTSxDQUFDLENBQUMsRUFBQztRQUVwRixNQUFNRSxPQUFPLE1BQU1OLHNFQUFtQjtRQUN0Q0csSUFBSUssTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQ0g7SUFFekIsRUFBRSxPQUFPSSxPQUFPO1FBQ1osSUFBSUEsaUJBQWlCTCxPQUFPO1lBQ3hCRixJQUFJSyxNQUFNLENBQUMsS0FBS0csSUFBSSxDQUFDO2dCQUFFRCxPQUFPQSxNQUFNRSxPQUFPO1lBQUM7WUFDNUM7UUFDSixDQUFDO1FBQ0RDLFFBQVFILEtBQUssQ0FBQ0E7UUFDZFAsSUFBSUssTUFBTSxDQUFDLEtBQUtHLElBQUksQ0FBQztZQUFFRCxPQUFPO1FBQXdCO0lBQzFEO0FBQ0osQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL215LWFwcC8uL3NyYy9wYWdlcy9hcGkvcGV0cy9pbmRleC50cz85YmJiIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE5leHQuanMgQVBJIHJvdXRlIHN1cHBvcnQ6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL2FwaS1yb3V0ZXMvaW50cm9kdWN0aW9uXG5pbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0J1xuaW1wb3J0IHsgUGV0IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuaW1wb3J0IHsgUGV0U2VydmljZSB9IGZyb20gJ0Avc2VydmljZXMvcGV0LnNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICAgIHJlcTogTmV4dEFwaVJlcXVlc3QsXG4gICAgcmVzOiBOZXh0QXBpUmVzcG9uc2U8UGFydGlhbDxQZXQ+W10gfCB7IGVycm9yOiBzdHJpbmcgfT5cbikge1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChyZXEubWV0aG9kICE9PSBcIkdFVFwiKSB0aHJvdyBuZXcgRXJyb3IoYEZvcmJpZGRlbiByZXF1ZXN0IG1ldGhvZDogJHtyZXEubWV0aG9kfWApXG5cbiAgICAgICAgY29uc3QgcGV0cyA9IGF3YWl0IFBldFNlcnZpY2UubGlzdFBldHMoKTtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocGV0cyk7XG4gICAgICAgIFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuc2VuZCh7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0pXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoeyBlcnJvcjogJ0ludGVybmFsIHNlcnZlciBlcnJvcicgfSk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIlBldFNlcnZpY2UiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwiRXJyb3IiLCJwZXRzIiwibGlzdFBldHMiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJzZW5kIiwibWVzc2FnZSIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/pets/index.ts\n");

/***/ }),

/***/ "(api)/./src/services/pet.service.ts":
/*!*************************************!*\
  !*** ./src/services/pet.service.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PetService\": () => (/* binding */ PetService)\n/* harmony export */ });\n/* harmony import */ var _models_pet_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/pet.model */ \"(api)/./src/models/pet.model.ts\");\n\nclass PetService {\n    static listPets() {\n        return _models_pet_model__WEBPACK_IMPORTED_MODULE_0__.PetModel.listPets();\n    }\n    static createPet(data) {\n        return _models_pet_model__WEBPACK_IMPORTED_MODULE_0__.PetModel.createPet(data);\n    }\n    static retrievePet(id) {\n        return _models_pet_model__WEBPACK_IMPORTED_MODULE_0__.PetModel.retrievePet(id);\n    }\n    static updatePet(id, data) {\n        return _models_pet_model__WEBPACK_IMPORTED_MODULE_0__.PetModel.updatePet(id, data);\n    }\n    static deletePet(id) {\n        return _models_pet_model__WEBPACK_IMPORTED_MODULE_0__.PetModel.deletePet(id);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvc2VydmljZXMvcGV0LnNlcnZpY2UudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDOEM7QUFHdkMsTUFBTUM7SUFDVCxPQUFjQyxXQUFXO1FBQ3JCLE9BQU9GLGdFQUFpQjtJQUM1QjtJQUVBLE9BQWNHLFVBQVVDLElBQVMsRUFBRTtRQUMvQixPQUFPSixpRUFBa0IsQ0FBQ0k7SUFDOUI7SUFFQSxPQUFjQyxZQUFZQyxFQUFVLEVBQUU7UUFDbEMsT0FBT04sbUVBQW9CLENBQUNNO0lBQ2hDO0lBRUEsT0FBY0MsVUFBVUQsRUFBVSxFQUFFRixJQUFrQixFQUFFO1FBQ3BELE9BQU9KLGlFQUFrQixDQUFDTSxJQUFJRjtJQUNsQztJQUVBLE9BQWNJLFVBQVVGLEVBQVUsRUFBRTtRQUNoQyxPQUFPTixpRUFBa0IsQ0FBQ007SUFDOUI7QUFDSixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktYXBwLy4vc3JjL3NlcnZpY2VzL3BldC5zZXJ2aWNlLnRzP2Q5ZjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGV0IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCJcbmltcG9ydCB7IFBldE1vZGVsIH0gZnJvbSBcIi4uL21vZGVscy9wZXQubW9kZWxcIlxuXG5cbmV4cG9ydCBjbGFzcyBQZXRTZXJ2aWNlIHtcbiAgICBwdWJsaWMgc3RhdGljIGxpc3RQZXRzKCkge1xuICAgICAgICByZXR1cm4gUGV0TW9kZWwubGlzdFBldHMoKVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUGV0KGRhdGE6IFBldCkge1xuICAgICAgICByZXR1cm4gUGV0TW9kZWwuY3JlYXRlUGV0KGRhdGEpXG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZXRyaWV2ZVBldChpZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBQZXRNb2RlbC5yZXRyaWV2ZVBldChpZClcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZVBldChpZDogbnVtYmVyLCBkYXRhOiBQYXJ0aWFsPFBldD4pIHtcbiAgICAgICAgcmV0dXJuIFBldE1vZGVsLnVwZGF0ZVBldChpZCwgZGF0YSlcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlbGV0ZVBldChpZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBQZXRNb2RlbC5kZWxldGVQZXQoaWQpXG4gICAgfVxufSJdLCJuYW1lcyI6WyJQZXRNb2RlbCIsIlBldFNlcnZpY2UiLCJsaXN0UGV0cyIsImNyZWF0ZVBldCIsImRhdGEiLCJyZXRyaWV2ZVBldCIsImlkIiwidXBkYXRlUGV0IiwiZGVsZXRlUGV0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/services/pet.service.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/pets/index.ts"));
module.exports = __webpack_exports__;

})();