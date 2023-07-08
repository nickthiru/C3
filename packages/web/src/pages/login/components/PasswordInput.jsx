export default function PasswordInput(props) {
  return (
    <div>
      <label className="label">
        <span className="text-base label-text">Password</span>
      </label>
      <input
        type="password"
        value={props.password}
        className="w-full input input-bordered"
        onChange={(e) => props.onInput(e.target.value)}
      />
    </div>
  );
}
