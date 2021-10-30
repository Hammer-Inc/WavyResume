import {GetStaticProps, NextPage} from "next";
import DynamicItem from "../../components/items/DynamicItem";
import {ParsedUrlQuery} from "querystring";

export async function getStaticPaths() {
  return {paths: [], fallback: false}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {getPageState, getAppState} = await import('../../store/rehydrate');
  const baseState = await getAppState();
  const initialReduxState = await getPageState(baseState, {
    type: 'experience',
    args: params as ParsedUrlQuery
  })
  return {props: {initialReduxState}}
}

const Page: NextPage = () => {
  return <>
    <DynamicItem source={"experience"}/>
  </>
}

export default Page