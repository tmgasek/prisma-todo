import { prisma } from "@/lib/prisma";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  if (!todo) {
    return {
      notFound: true,
      props: {},
    };
  }
  return {
    props: { todo },
  };
};

export default function TodoPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { todo } = props;
  if (!todo) return;

  return (
    <div>
      <h1>{todo.text}</h1>
    </div>
  );
}
