# Norrcli

![norrcli banner](./resource/svg/banner.svg)

This is a simplistic CLI application built using typescript and Node.JS that fetches jokes about Chuck Norris utilizing the Chuck Norris API: [https://api.chucknorris.io](https://api.chucknorris.io)

## Table of contents

## Commands

| command | subcommand     | option         | argument   | response                    |
| ------- | -------------- | -------------- | ---------- | --------------------------- |
| norrcli | category       | -c, --category | \<string\> | joke based on category      |
| norrcli | query          | -q, --query    | \<string\> | joke array based on query   |
| norrcli | random         |                |            | joke based on random topic  |
| norrcli | ac             |                |            | list valid categories       |
| norrcli | help           |                |            | man page                    |
| norrcli |                | -h, --help     |            | man page                    |
| norrcli |                | -V, --version  |            | displays the version number |
| norrcli | \<subcommand\> | -h, --help     |            | help on the \<subcommand\>  |