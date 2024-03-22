package io.watssuggang.voda.diary.dto.req;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.*;

@Getter
@Data
@JsonInclude(value = Include.NON_ABSENT)
public class KarloRequest {

    private final String version;
    private final String prompt;
    private final Integer height;
    private final Integer width;
    private final String negative_prompt;
    private final Boolean upscale;
    private final Integer scale;
    private final String imageFormat;
    private final Integer imageQuality;
    private final Integer samples;
    private final String returnType;
    private final Integer priorNumInferenceSteps;
    private final Double priorGuidanceScale;
    private final Integer numInferenceSteps;
    private final Double guidanceScale;
    private final String scheduler;
    private final Long[] seed;
    private final Boolean nsfwChecker;

    @Builder
    public KarloRequest(String version, String prompt, Integer height, Integer width,
        String negative_prompt, Boolean upscale, Integer scale, String imageFormat,
        Integer imageQuality, Integer samples, String returnType,
        Integer priorNumInferenceSteps,
        Double priorGuidanceScale, Integer numInferenceSteps, Double guidanceScale,
        String scheduler, Long[] seed, Boolean nsfwChecker) {
        this.version = version;
        this.prompt = prompt;
        this.height = height;
        this.width = width;
        this.negative_prompt = negative_prompt;
        this.upscale = upscale;
        this.scale = scale;
        this.imageFormat = imageFormat;
        this.imageQuality = imageQuality;
        this.samples = samples;
        this.returnType = returnType;
        this.priorNumInferenceSteps = priorNumInferenceSteps;
        this.priorGuidanceScale = priorGuidanceScale;
        this.numInferenceSteps = numInferenceSteps;
        this.guidanceScale = guidanceScale;
        this.scheduler = scheduler;
        this.seed = seed;
        this.nsfwChecker = nsfwChecker;
    }
}