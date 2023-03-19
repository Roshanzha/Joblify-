const notFoundMiddleWare = (req, res) => {
res.status(404).send('not  found')
}
export default notFoundMiddleWare