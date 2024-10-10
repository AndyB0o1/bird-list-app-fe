export default function RegisterPage() {
    return (
        <>
            <h1 className="mt-4 p-2 bg-sky-700 text-white">Register to start your list by completing the form below</h1>
            <form className="my-3 flex flex-col gap-4 px-3">
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Create username (required)</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="username" name="username" placeholder="Username" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Create a password (required)</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="password" name="password" placeholder="password" />
                </div>
                <input className="bg-sky-700 text-white p-1" type="submit" value="Register" />
            </form>
        </>
    )
}