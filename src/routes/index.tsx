export default function Home() {
  return (
    <main class="w-full space-y-2 p-4">
      <h2 class="text-3xl font-bold">Hello USER</h2>
      <h3 class="text-xl font-bold">Message board</h3>
      <form action={logout} method="post">
        <button name="logout" type="submit">
          Logout
        </button>
      </form>
    </main>
  );
}
