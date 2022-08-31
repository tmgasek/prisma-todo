import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { prisma } from "@/lib/prisma";

// can't use :GET_SERVER_SIDE_PROPS_TYPE or it won't be inferred right
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const todos = await prisma.todo.findMany({
    include: {
      author: {
        select: {
          firstName: true,
        },
      },
    },
  });

  return {
    props: { todos },
  };
};

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { todos } = props;
  return (
    <div>
      <h1>Hey there</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.text}</h2>
          <a href={`/todo/${todo.id}`}>{todo.id}</a>
        </div>
      ))}
    </div>
  );
};

export default Home;
