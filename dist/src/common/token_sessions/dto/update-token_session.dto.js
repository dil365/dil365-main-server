"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTokenSessionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_token_session_dto_1 = require("./create-token_session.dto");
class UpdateTokenSessionDto extends (0, mapped_types_1.PartialType)(create_token_session_dto_1.CreateTokenSessionDto) {
}
exports.UpdateTokenSessionDto = UpdateTokenSessionDto;
//# sourceMappingURL=update-token_session.dto.js.map