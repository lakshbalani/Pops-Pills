# Data Foundation System, Spring 2023

Project Number : 47

Team Name : Pops&Pills

Project Category : Blog and Discussion Forum

Project Name: Discussion Forum Integration

TA Assigned : Amit Pandey and Shaantanu Kulkarni

Team Members :

1. Laksh Balani (2020102019)
2. Knv Karthikeya (2020102003)
3. Ishanya Sethi (2020102014)

## Overview

The Discussion Forum Integration project is a software system that integrates an open source discussion forum into an existing web application (Data Foundation). The system will provide users with a platform to discuss data sets, models, and blog posts related to the Data Foundation. The preferred technology stack for the project is ReactJS and NodeJS.

## Project Goals

**Integrate a discussion forum to Data Foundation** : The primary goal of the project is to integrate a discussion forum into the Data Foundation web application. The discussion forum will allow users to create and manage threads within various blogs.

**Forum categories and threads**: Allow users to create and manage threads within various blogs, and allow other users to reply to those threads. Implement a hierarchical structure for threads and replies, where replies are nested under the thread they belong to.

**Create a custom UI**: Create a custom UI for the discussion forum that matches the look and feel of the Data Foundation web application.

**Rich text editor**: Provide a rich text editor that allows users to format their posts with different fonts, colors, and styles, and add images or other media.

**Profanity filter**: Implement a profanity filter to prevent users from posting inappropriate content.

## Functional Requirements

#### 1. Thread and Replies:

The system shall allow users to create new threads and reply to existing threads.

#### 2. Thread and Reply Hierarchy:

The system shall implement a hierarchical structure for threads and replies, where replies are nested under the thread they belong to.

#### 3. Upvote and Downvote:

The system shall allow users to upvote or downvote threads and replies.

#### 4. Rich Text Editor:

The system shall provide a rich text editor that allows users to format their posts with different fonts, colors, and styles, and add images or other media.

#### 5. Edit and Delete:

The system shall allow users to edit or delete their own threads and replies.

#### 6. Profanity Filter:

The system shall implement a profanity filter to prevent users from posting inappropriate content.

## Non-Functional Requirements

#### 1. Performance:

The system shall be able to handle a high volume of traffic and database queries with minimal response time.

#### 2. Scalability:

The system architecture shall be designed to scale horizontally or vertically to meet increasing traffic and database load.

#### 3. Usability:

The user interface shall be user-friendly, intuitive, and responsive to provide a good user experience.

#### 4. Availability:

The system shall be available 24/7 with minimal downtime for maintenance and upgrades.

#### 5. Compatibility:

The system shall be compatible with different web browsers, devices, and screen sizes.

## Comments Schema Details

<center>

| Field        | Type   | Description                                                |
| ------------ | ------ | ---------------------------------------------------------- |
| id           | NUMBER | The id of the comment                                      |
| content      | STRING | Contains the data given by the user in the comment section |
| items        | OBJECT | Replies to a particular comment                            |
| author       | STRING | token of the user who has written the comment              |
| authorName   | STRING | name of the user who has written the comment               |
| authorEmail  | STRING | email of the user who has written the comment              |
| likes        | NUMBER | Number of likes to a particular comment or reply           |
| dislikes     | NUMBER | Number of dislikes to a particular comment or reply        |
| likers       | OBJECT | The list of likers to a particular comment or reply        |
| dislikers    | OBJECT | The list of dislikers to a particular comment or reply     |
| last_updated | OBJECT | The Date-Time when the comment was last updated            |

</center>

## Database Schema Details

<center>

| Field        | Type         | Description                                   |
| ------------ | ------------ | --------------------------------------------- |
| id           | VARCHAR(255) | The id of the forum                           |
| commentsjson | longtext     | Hierarchical tree like structure for comments |

```
CREATE TABLE `comments`(
    `id` VARCHAR(255) NOT NULL,
    `commentsjson` longtext NOT NULL
);

```

## API Endpoints

#### 1. Create a new thread

```
/api/init
```

The body of the request should be a JSON object with the following fields:

```
{
    "id": "forum id"
}
```

#### 2. Get a thread by id

```
/api/get
```
The body of the request should be a JSON object with the following fields:

```
{
    "id": "forum id"
}
```

#### 3. Update a thread

```
/api/create
```
The body of the request should be a JSON object with the following fields:

```
{
    "id": "forum id",
    "commentsjson": "hierarchical tree like structure for comments"
}
```

All the above endpoints are POST requests. 


## Flow Chart

#### User Work Flow

![Image](/users.png)

```

```
