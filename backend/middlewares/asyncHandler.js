const asyncHandler = (handler) => (req, res, next) =>
    Promise.resolve(handler(req, res, next)).catch((err) => {
        res.status(500).json({ message: err.message });
    }
    );
export default asyncHandler;

