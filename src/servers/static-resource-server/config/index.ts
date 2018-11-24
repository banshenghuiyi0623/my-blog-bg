exports.Expires = {
  fileMatch: /^(gif|png|jpg|js|css)$/ig,
  maxAge: 60 * 60 * 24 * 365
}

interface CompressInterface{
  match: RegExp
}

let compress: CompressInterface = {
    match: /css|js|html|png/ig
}
exports.Compress = compress