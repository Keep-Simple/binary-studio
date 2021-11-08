package com.keep.simple.backend.auth;

import com.keep.simple.backend.auth.dto.UserRegisterDto;
import com.keep.simple.backend.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AuthUserMapper {
    AuthUserMapper MAPPER = Mappers.getMapper(AuthUserMapper.class);

    @Mapping(target = "avatar", ignore = true)
    @Mapping(target = "user_id", ignore = true)
    @Mapping(target = "isAdmin", ignore = true)
    User userRegisterDtoToUser(UserRegisterDto userDto);
}
