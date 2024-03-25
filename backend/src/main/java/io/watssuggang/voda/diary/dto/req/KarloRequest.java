package io.watssuggang.voda.diary.dto.req;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
@JsonInclude(value = Include.NON_ABSENT)
public class KarloRequest {

    private final String version = "v2.1";
    private final String prompt;
    private final Integer height = 1024;
    private final Integer width = 1024;
    private final String negative_prompt = "low quality, low contrast, draft, amateur, cut off, cropped, frame,split image, out of frame, amputee, mutated, mutation, deformed, severed, dismembered, corpse, photograph, poorly drawn, bad anatomy, blur, blurry, lowres, bad hands, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, artist name, ugly, symbol, hieroglyph, extra fingers,  six fingers per hand, four fingers per hand, disfigured hand, monochrome, missing limb, disembodied limb, linked limb, connected limb, interconnected limb,  broken finger, broken hand, broken wrist, broken leg, split limbs, no thumb, missing hand, missing arms, missing legs, fused finger, fused digit, missing digit, bad digit, extra knee, extra elbow, storyboard, split arms, split hands, split fingers, twisted fingers, disfigured butt, deformed hands,  watermark, text, deformed fingers, blurred faces, irregular face, irrregular body shape, ugly eyes, deformed face, squint, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, poorly framed, extra limbs, disfigured, deformed, body out of frame, blurry, bad anatomy, blurred, watermark, grainy, signature, cut off, draft, ugly eyes, squint, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, poorly framed, extra limbs, disfigured, deformed, body out of frame, blurry, bad anatomy, blurred, watermark, grainy, signature, cut off, draft, disfigured, kitsch, ugly, oversaturated, grain, low-res, Deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb, blurry, floating limbs, disconnected limbs, malformed hands, blur, out of focus, long neck, long body, ugly, disgusting, poorly drawn, childish, mutilated, mangled, old, surreal, 2 heads, 2 faces, cartoon, black and white photo, disfigured, kitsch, ugly, oversaturated, grain, low-res, Deformed, blurry, bad anatomy, poorly drawn face, mutation, mutated, extra limb";
    private final Integer samples = 1;
    private final String image_format = "jpeg";

    public KarloRequest(String prompt) {
        this.prompt = prompt;
    }

    public static KarloRequest of(String prompt) {
        return new KarloRequest(prompt);
    }
}
