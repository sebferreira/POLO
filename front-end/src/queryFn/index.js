import {handleCustomApiRequest} from "./../shared/clientShared.js";
const URL = "https://poloweb-api.vercel.app/api";

/* const URL = "http://localhost:3000/api"; */

function verifyCookies() {
  return handleCustomApiRequest({
    url: `${URL}/verify`,
    method: "GET",
    withToken: true,
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
function userLogout() {
  return handleCustomApiRequest({
    url: `${URL}/logout`,
    method: "POST",
    withToken: true,
  });
}
function getAllUserBoards() {
  return handleCustomApiRequest({
    url: `${URL}/users/boards`,
    method: "GET",
    withToken: true,
  });
}
function createBoards(body) {
  return handleCustomApiRequest({
    url: `${URL}/boards/`,
    method: "POST",
    body,
    withToken: true,
  });
}
function inviteUsers(body, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/boards/${boardId}/inviteBoard`,
    method: "POST",
    body,
    withToken: true,
  });
}
function getUsersBoard(boardId) {
  return handleCustomApiRequest({
    url: `${URL}/users/board/${boardId}`,
    method: "GET",
    withToken: true,
  });
}
function createSections(body, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/sections/${boardId}/`,
    method: "POST",
    body,
    withToken: true,
  });
}

function createTasks(body, sectionId, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/tasks/${sectionId}/${boardId}`,
    method: "POST",
    body,
    withToken: true,
  });
}
function DeleteTask(taskId, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/tasks/${taskId}/${boardId}`,
    method: "DELETE",
    withToken: true,
  });
}
function UpdateTask(taskId, body, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/tasks/${taskId}/${boardId}`,
    method: "PATCH",
    body,
    withToken: true,
  });
}
function UpdateSection(sectionId, body, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/sections/${sectionId}/${boardId}`,
    method: "PATCH",
    body,
    withToken: true,
  });
}
function DeleteSections(sectionId, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/sections/${sectionId}/${boardId}`,
    method: "DELETE",
    withToken: true,
  });
}
function UpdateBoard(boardId, body) {
  return handleCustomApiRequest({
    url: `${URL}/boards/${boardId}`,
    method: "PATCH",
    body,
    withToken: true,
  });
}
function DeleteBoard(boardId) {
  return handleCustomApiRequest({
    url: `${URL}/boards/${boardId}`,
    method: "DELETE",
    withToken: true,
  });
}
function DeleteUserfromBoard(username, boardId) {
  return handleCustomApiRequest({
    url: `${URL}/users/${username}/${boardId}`,
    method: "DELETE",
    withToken: true,
  });
}

function getAllContentBoard(boardId) {
  return handleCustomApiRequest({
    url: `${URL}/boards/contains/${boardId}`,
    method: "GET",
    withToken: true,
  });
}
function updateInChargeTask(boardId, taskId) {
  return handleCustomApiRequest({
    url: `${URL}/tasks/asignacion/${boardId}/${taskId}`,
    method: "PATCH",
    withToken: true,
  });
}

export {
  verifyCookies,
  signIn,
  signUp,
  userLogout,
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
  updateInChargeTask,
};
