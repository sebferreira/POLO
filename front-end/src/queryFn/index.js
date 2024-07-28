import {handleCustomApiRequest} from "./../shared/clientShared.js";

const URL = "https://poloweb-api.vercel.app/api";

function verifyCookies() {
  return handleCustomApiRequest({
    url: `${URL}/verify`,
    method: "GET",
  });
}

function signIn(body) {
  return handleCustomApiRequest({
    url: `${URL}/login`,
    method: "POST",
    body,
  });
}
function signUp(body) {
  return handleCustomApiRequest({
    url: `${URL}/register`,
    method: "POST",
    body,
  });
}
function getAllUserBoards() {
  return handleCustomApiRequest({
    url: `${URL}/users/boards`,
    method: "GET",
  });
}
function createBoards(body) {
  return handleCustomApiRequest({
    url: `${URL}/boards/`,
    method: "POST",
    body,
  });
}
function inviteUsers(body, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/boards/${boardId}/inviteBoard`,
    method: "POST",
    body,
  });
}
function getUsersBoard(boardId) {
  return handleCustomApiRequest({
    url: `${URL}/users/board/${boardId}`,
    method: "GET",
  });
}
function createSections(body, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/sections/${boardId}/`,
    method: "POST",
    body,
  });
}

function createTasks(body, sectionId, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/tasks/${sectionId}/${boardId}`,
    method: "POST",
    body,
  });
}
function DeleteTask(taskId, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/tasks/${taskId}/${boardId}`,
    method: "DELETE",
  });
}
function UpdateTask(taskId, body, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/tasks/${taskId}/${boardId}`,
    method: "PATCH",
    body,
  });
}
function UpdateSection(sectionId, body, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/sections/${sectionId}/${boardId}`,
    method: "PATCH",
    body,
  });
}
function DeleteSections(sectionId, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/sections/${sectionId}/${boardId}`,
    method: "DELETE",
  });
}
function UpdateBoard(boardId, body) {
  return handleCustomApiRequest({
    url: `${URL}/boards/${boardId}`,
    method: "PATCH",
    body,
  });
}
function DeleteBoard(boardId) {
  return handleCustomApiRequest({
    url: `${URL}/boards/${boardId}`,
    method: "DELETE",
  });
}
function DeleteUserfromBoard(username, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/users/${username}/${boardId}`,
    method: "DELETE",
  });
}

function getAllContentBoard(boardId) {
  return handleCustomApiRequest({
    url: `${URL}/boards/contains/${boardId}`,
    method: "GET",
  });
}

export {
  verifyCookies,
  signIn,
  signUp,
  inviteUsers,
  getAllUserBoards,
  getAllContentBoard,
  getUsersBoard,
  createBoards,
  createSections,
  createTasks,
  DeleteTask,
  DeleteBoard,
  DeleteSections,
  DeleteUserfromBoard,
  UpdateTask,
  UpdateSection,
  UpdateBoard,
};
