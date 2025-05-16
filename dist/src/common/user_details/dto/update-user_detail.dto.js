"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDetailDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_detail_dto_1 = require("./create-user_detail.dto");
class UpdateUserDetailDto extends (0, mapped_types_1.PartialType)(create_user_detail_dto_1.CreateUserDetailDto) {
}
exports.UpdateUserDetailDto = UpdateUserDetailDto;
//# sourceMappingURL=update-user_detail.dto.js.map