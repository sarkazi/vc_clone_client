import React from "react";
import styles from "./rating.module.scss";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";
import CommentBlock from "../../components/CommentBlock";
import Tabs from "../../components/Tabs";
import { Button, IconButton } from "@mui/material";

import BtnFollow from "../../components/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { GetServerSideProps, NextPage } from "next/types";
import { Api } from "../../utils/api";
import { responseUser } from "../../utils/api/types";

import MainWrapper from "../../components/MainWrapper";

import AvatarBlock from "../../components/AvatarBlock";

const tabsTimelineRating = ["Ноябрь", "3 месяца", "За всё время"];

interface RatingPageProps {
  users: responseUser[];
}

const Rating: NextPage<RatingPageProps> = ({ users }) => {
  return (
    <MainWrapper sizePage="ratingPage">
      <div className={styles.ratingWrapper}>
        <section className={styles.desc}>
          <h2>Рейтинг блогов и компаний</h2>
          <p>
            Десять лучших авторов и комментаторов из рейтинга по итогам месяца
            бесплатно получают Plus-аккаунт на месяц.
          </p>
          <Tabs marg={null} tabs={tabsTimelineRating} />
        </section>
        <section className={styles.ratingBlock}>
          <Table>
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell className={styles.theadTitle}>Блоги</TableCell>
                <TableCell align="right" className={styles.theadRating}>
                  Рейтинг
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {users.map((obj, index) => (
                <TableRow key={obj.id} className={styles.tableRow}>
                  <TableCell className={styles.tableNameBlock}>
                    <Link href={`/profile/${obj.id}`}>
                      <span>{index + 1}</span>
                      <AvatarBlock
                        avatarPath={obj.avatarUrl}
                        typeAvatar="user"
                        location="ratingPage"
                      />
                      <h3>{obj.fullName}</h3>
                    </Link>
                  </TableCell>

                  <TableCell align="right" className={styles.tableRating}>
                    {obj.commentsCount * 2}
                  </TableCell>
                  <TableCell align="right">
                    <BtnFollow />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
      <CommentBlock />
    </MainWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const users = await Api(ctx).user.findAll();
    return {
      props: {
        users: users,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        users: null,
      },
    };
  }
};

export default Rating;
