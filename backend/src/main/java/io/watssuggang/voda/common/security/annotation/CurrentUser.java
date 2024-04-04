package io.watssuggang.voda.common.security.annotation;

import java.lang.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@Target({ElementType.PARAMETER, ElementType.TYPE})  // 파라미터와 타입(클래스, 인터페이스 등)에 적용될 수 있다
@Retention(RetentionPolicy.RUNTIME)                 //어노테이션 정보가 런타임에도 유지
@Documented
@AuthenticationPrincipal                            // 인증된 사용자의 객체를 메소드의 파라미터로 주입
public @interface CurrentUser {

}
