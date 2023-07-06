export default function EmailSection() {
  return (
    <div>
      <label className="label">
        <span className="text-base label-text">Email/Username</span>
      </label>
      <input
        type="text"
        value={username}
        className="w-full input input-bordered"
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
}
