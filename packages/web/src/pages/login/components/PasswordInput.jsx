export default function PasswordSection() {
  return (
    <div>
      <label className="label">
        <span className="text-base label-text">Password</span>
      </label>
      <input
        type="password"
        value={password}
        className="w-full input input-bordered"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}
