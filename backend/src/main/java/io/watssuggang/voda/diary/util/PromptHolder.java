package io.watssuggang.voda.diary.util;

public class PromptHolder {

    //    public static final String INIT_PROMPT = "지금부터 너는 일기쓰기 전문가야. 나에게 일기 쓰기를 시작하기에 좋은 질문을 물어봐. 한 개만 물어봐";
    public static final String DEFAULT_PROPMT = "나와 일기 주제로 대화를 나누자. 나에게 일기 쓰기를 시작하기에 좋은 질문을 물어봐. 한 개만 물어봐. 짧게 대답해.";
    public static final String CREATE_DIARY_MESSAGE = " 라는 내용의 일기를 작성해줘. "
            + "내가 준 문장을 깔끔하게 만들어서 일기를 작성해줘. "
            + "일기의 제목과 일기, 이 일기에서 느껴지는 감정(JOY, ANGER, SADNESS, FEAR, CURIOSITY중에 가장 어울리는 하나)을 정해줘 "
            + "해당 일기를 그림으로 만들기 위한 프롬프트만 영어로 정리해줘."
            + "위 내용들을 JSON 형식 (title, content, emotion, prompt)으로 정리해서 답변해줘.";
}
