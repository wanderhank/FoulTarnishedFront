"use client"
import jwt_decode, {jwtDecode} from "jwt-decode";
import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Eye, EyeOff} from "lucide-react"
import Link from "next/link"
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Falha no login");
            }

            const data = await res.json();
            localStorage.setItem("token", data.token); // ou cookies
            const token = localStorage.getItem("token")
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    (decoded.role === "Admin") ? router.push("/admin") : router.push("/home")
                } catch (error) {
                    console.error('Falha ao decodificar o token:', error);
                }
            }



        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#f0f2f5]">
            {/* Header */}
            <div className="bg-[#7a1c1c] py-6">
                <h1 className="text-center text-white text-4xl font-normal">Foul Tarnished</h1>
            </div>

            {/* Login Form */}
            <div className="flex items-center justify-center px-4 py-16">
                <Card className="w-full max-w-md bg-white shadow-lg border-0 rounded-2xl">
                    <CardHeader className="pb-6 pt-8">
                        <CardTitle className="text-center text-[#393939] text-3xl font-normal">Login</CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[#393939] text-base font-normal">
                                    E-mail
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 border-[#d8dadc] rounded-lg text-[#393939] placeholder:text-[#393939]/60"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-[#393939] text-base font-normal">
                                    Senha
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Digite sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-12 border-[#d8dadc] rounded-lg text-[#393939] placeholder:text-[#393939]/60 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#393939]/60 hover:text-[#393939]"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 space-y-4">
                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-[#7a1c1c] hover:bg-[#7a1c1c]/90 text-white rounded-lg text-base font-normal"
                                >
                                    Acessar
                                </Button>

                                <Link href="/signin">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full h-12 border-[#7a1c1c] text-[#7a1c1c] hover:bg-[#7a1c1c]/5 rounded-lg text-base font-normal bg-transparent"
                                    >
                                        Criar Conta
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
