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
exports.deleteUsuarios = exports.putUsuarios = exports.postUsuarios = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({
        msg: 'GetUsuarios',
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `NO existe un usuario con el id ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email: ${body.email}`
            });
        }
        const usuario = yield usuario_1.default.create(body);
        res.json(usuario);
    }
    catch (error) {
        res.status(500).json({
            msg: `Error de servidor`
        });
    }
});
exports.postUsuarios = postUsuarios;
const putUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        yield usuario.update(body);
        res.json(usuario);
    }
    catch (error) {
        res.status(500).json({
            msg: `Error de servidor`
        });
    }
});
exports.putUsuarios = putUsuarios;
const deleteUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        yield usuario.update({ estado: false }); //eliminacion logica
        // await usuario.destroy()       //eliminacion fisica
        res.json(usuario);
    }
    catch (error) {
        res.status(500).json({
            msg: `Error de servidor`
        });
    }
});
exports.deleteUsuarios = deleteUsuarios;
//# sourceMappingURL=usuarios.js.map