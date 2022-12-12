import { GetServerSideProps, NextPage } from "next";
import Message from "../../screens/message/Message";
import { Api } from "../../utils/api";

const MessagePage: NextPage = () => {
  return <Message />;
};

//export const getServerSideProps: GetServerSideProps = async (ctx) => {
//  try {
//    const dialog = await Api(ctx).dialogs.findOne(+ctx.query.id);

//    return {
//      props: {
//        dialog: dialog,
//      },
//    };
//  } catch (err) {
//    console.log(err);
//    return {
//      props: {
//        dialog: null,
//      },
//      redirect: {
//        destination: "/",
//      },
//    };
//  }
//};

export default Message;
