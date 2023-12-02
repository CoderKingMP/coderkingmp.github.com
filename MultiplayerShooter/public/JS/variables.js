const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
const socket = io();
const width = window.innerHeight;
const height = window.innerWidth;
var scrollX = 0;
var scrollY = 0;

var dirtBlock = document.getElementById("dirtBlock");
var fieldBlock = document.getElementById("GrassField");
var floorBlock = document.getElementById("Floor1");
ctx.scale(0.5,0.5)



const frontEndPlayers = {}


