"use client"

import type React from "react"

import {useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Eye, EyeOff} from "lucide-react"
import Link from "next/link"
import {useRouter} from "next/navigation";

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("");
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",

    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log("Sign in form submitted:", formData)

        try {
            const res = await fetch("/api/signin", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Falha ao cadastrar");
            }

            router.push("/login");
        } catch (err: any) {
            setError(err.message);
        }
    };



    return (
        <div className="min-h-screen bg-[#f0f2f5]">
            {/* Header */}
            <div className="bg-[#7a1c1c] py-6">
                <h1 className="text-center text-white text-3xl font-medium">Foul Tarnished</h1>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center px-4 py-12">
                <Card className="w-full max-w-md bg-white shadow-lg border-0 rounded-2xl">
                    <CardHeader className="text-center pb-6">
                        <CardTitle className="text-2xl font-medium text-[#393939]">Criar Conta</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 px-8 pb-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-[#393939]">
                                    Nome
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Digite seu nome"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="h-12 border-[#d8dadc] rounded-lg focus:border-[#7a1c1c] focus:ring-[#7a1c1c] placeholder:text-[#8a8a8a]"
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-[#393939]">
                                    E-mail
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="h-12 border-[#d8dadc] rounded-lg focus:border-[#7a1c1c] focus:ring-[#7a1c1c] placeholder:text-[#8a8a8a]"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-[#393939]">
                                    Senha
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Digite sua senha"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="h-12 border-[#d8dadc] rounded-lg focus:border-[#7a1c1c] focus:ring-[#7a1c1c] placeholder:text-[#8a8a8a] pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a8a] hover:text-[#393939] transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#393939]">
                                    Confirmar Senha
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirme sua senha"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="h-12 border-[#d8dadc] rounded-lg focus:border-[#7a1c1c] focus:ring-[#7a1c1c] placeholder:text-[#8a8a8a] pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a8a] hover:text-[#393939] transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5"/> :
                                            <Eye className="h-5 w-5"/>}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full h-12 bg-[#7a1c1c] hover:bg-[#6a1818] text-white font-medium rounded-lg transition-colors"
                            >
                                Criar Conta
                            </Button>

                            {/* Login Link */}
                            <div className="text-center">
                                <Link href="/">
                                    <Button
                                        variant="outline"
                                        className="border-[#7a1c1c] text-[#7a1c1c] hover:bg-[#7a1c1c] hover:text-white font-medium rounded-lg px-8 bg-transparent"
                                    >
                                        Já tenho conta
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
