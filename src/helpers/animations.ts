import {animations} from "@/helpers/index";

export async function getMultipleMessageStepByStepWithDelay(
    expectedTexts: string[],
    callbackOnEveryAddCharacter: (partialText: string) => void,
): Promise<void> {

    await animations.getMessageStepByStepWithDelay(expectedTexts[0], callbackOnEveryAddCharacter);
    await animations.wait();

    if (expectedTexts.length > 0) {
        await getMultipleMessageStepByStepWithDelay(
            expectedTexts.filter((item, index) => index != 0),
            callbackOnEveryAddCharacter,
        );
    }
}

/**
 *
 * @param expectedText
 * @param callbackOnEveryAddCharacter
 * @param timeout
 *
 * @return Promise which resolves when animation is done
 */
export async function getMessageStepByStepWithDelay(
    expectedText: string | undefined,
    callbackOnEveryAddCharacter: (partialText: string) => void,
    timeout = 40
) {
    if(expectedText == null) {
        return;
    }
    return new Promise<void>(resolve => {
        let text = '', myArray = expectedText.split('');
        const write = (index: number = 0): void => {
            text = text + myArray[index++];
            callbackOnEveryAddCharacter(text);
            if (index < myArray.length) {
                setTimeout(() => write(index), timeout);
            } else {
                resolve();
            }
        };
        setTimeout(write, timeout * 10 /* initial wait should be longer */);
    });
}

export async function wait(howLong: number = 1500) {
    return new Promise<void>(resolve => setTimeout(resolve, howLong));
}
