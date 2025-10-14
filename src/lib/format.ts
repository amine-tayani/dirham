import dayjs from "dayjs";

export function formatDate(value: Date | string) {
	return dayjs(value).format("ll HH:mm:ss");
}
