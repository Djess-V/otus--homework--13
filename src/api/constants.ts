export type IValue = "asc" | "desc";

interface IFilterObj {
  id: string;
  title: string;
  subTitle1: {
    text: string;
    value: IValue;
  };
  subTitle2: {
    text: string;
    value: IValue;
  };
}

type IFilterData = IFilterObj[];

export const filterData: IFilterData = [
  {
    id: "text",
    title: "Алфавиту",
    subTitle1: { text: "от А до Я", value: "asc" },
    subTitle2: { text: "от Я до А", value: "desc" },
  },
  {
    id: "createdAt",
    title: "Дате",
    subTitle1: { text: "сначала новые", value: "desc" },
    subTitle2: { text: "сначала старые", value: "asc" },
  },
  {
    id: "status",
    title: "Статусу",
    subTitle1: { text: "выполненно", value: "desc" },
    subTitle2: { text: "невыполненно", value: "asc" },
  },
  {
    id: "tags",
    title: "Тегам",
    subTitle1: { text: "Введите теги", value: "asc" },
    subTitle2: { text: "", value: "desc" },
  },
];
