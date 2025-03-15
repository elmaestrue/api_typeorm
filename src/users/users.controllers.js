"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = require("./users.service");
const validate_request_1 = __importDefault(require("../_middleware/validate-request"));
const joi_1 = __importDefault(require("joi"));
const getAll = (req, res, next) => {
    users_service_1.userService.getAll()
        .then(users => res.json(users))
        .catch(next);
};
const getById = (req, res, next) => {
    users_service_1.userService.getById(req.params.id)
        .then(users => res.json(users))
        .catch(next);
};
const create = (req, res, next) => {
    users_service_1.userService.create(req.body)
        .then(() => res.json({ message: "User created" }))
        .catch(next);
};
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    users_service_1.userService.update(req.params.id, req.body)
        .then(() => res.json({ message: "User updated" }))
        .catch(next);
});
const _delete = (req, res, next) => {
    users_service_1.userService.delete(req.params.id)
        .then(() => res.json({ message: "User deleted" }))
        .catch(next);
};
const createSchema = (req, res, next) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        role: joi_1.default.string().valid('Admin', 'User').required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required()
    });
    (0, validate_request_1.default)(req, next, schema);
};
const updateSchema = (req, res, next) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().empty(''),
        firstName: joi_1.default.string().empty(''),
        lastName: joi_1.default.string().empty(''),
        role: joi_1.default.string().valid('Admin', 'User').empty(''),
        email: joi_1.default.string().email().empty(''),
        password: joi_1.default.string().min(6).empty(''),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    (0, validate_request_1.default)(req, next, schema);
};
const userControllers = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    createSchema,
    updateSchema
};
exports.default = userControllers;
