package io.watssuggang.voda.diary.util;

public class PromptHolder {

    public static final String INIT_PROMPT = "지금부터 너는 일기쓰기 전문가야. 나에게 일기 쓰기를 시작하기에 좋은 질문을 물어봐. 한 개만 물어봐";
    public static final String CREATE_DIARY_MESSAGE = " 라는 내용의 일기를 작성해줘. 내가 준 문장을 깔끔하게 만들어서 일기를 작성해줘. 일기의 제목과 일기, 이 일기에서 느껴지는 감정(JOY, ANGER, SADNESS, FEAR, CURIOSITY중에 가장 어울리는 하나)을 정해서 JSON 형식으로 정리해서 답변해줘. ";

    public static String diarySummaryPrompt(String emotion) {
        return "다음 내용들에서 " + emotion
            + " 감정을 가장 잘 담고 있는 핵심적인 문장을 딱 하나만 반환해. 네 의견을 담지 말고 내가 제공한 내용에 있는 문장만 반환해. 내용이 없어서 반환할 수 없다면, 일기 내용이 부족합니다. 라는 문장만 반환해. 그 외 다른 내용은 반환하지마.";
    }
}
