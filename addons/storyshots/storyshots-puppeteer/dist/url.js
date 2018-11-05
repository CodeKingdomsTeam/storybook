"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constructUrl = void 0;

var _url = require("url");

const constructUrl = (storybookUrl, kind, story) => {
  const encodedKind = encodeURIComponent(kind);
  const encodedStoryName = encodeURIComponent(story);
  const storyUrl = `/iframe.html?selectedKind=${encodedKind}&selectedStory=${encodedStoryName}`;
  const {
    protocol,
    host,
    pathname,
    search
  } = new _url.URL(storybookUrl);
  const pname = pathname.replace(/\/$/, ''); // removes trailing /

  const query = search.replace('?', '&'); // convert leading ? to &

  return `${protocol}//${host}${pname}${storyUrl}${query}`;
};

exports.constructUrl = constructUrl;