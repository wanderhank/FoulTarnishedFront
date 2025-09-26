"use client"

import type React from "react"

import {useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Badge} from "@/components/ui/badge"
import {Textarea} from "@/components/ui/textarea"
import {Eye, EyeOff, Edit, Trash2, Plus, Shield, Sword, Gem} from "lucide-react"
import {jwtDecode} from "jwt-decode";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export default function AdminHomePage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState<string>("")
    const [draggedItem, setDraggedItem] = useState<any>(null)
    const [selectedItemType, setSelectedItemType] = useState<string>("")
    const [editingItem, setEditingItem] = useState<any>(null)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [editDialogOpenEditUser, setEditDialogOpenEditUser ] = useState(false)
    const [error, setError] = useState("");
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const token = localStorage.getItem("token");
    let decoded = null;
    if (token != null) {
          decoded = jwtDecode(token);
          console.log(decoded)
    }
    const [weaponFormData, setWeaponFormData] = useState({
        name: "",
        type: "",
        subtype: "",
        image: "",
        description: "",
        category: "",
        weight: "",
        attack: {phy: "", mag: "", fire: "", ligt: "", holy: "", crit: ""},
        defence: {phy: "", mag: "", fire: "", ligt: "", holy: "", boost: ""},
        scalesWith: [
            {name: "", scaling: ""},
            {name: "", scaling: ""},
        ],
        requiredAttributes: [
            {name: "", amount: ""},
            {name: "", amount: ""},
        ]
    })

    const [shieldFormData, setShieldFormData] = useState({
        name: "",
        type: "",
        subtype: "",
        image: "",
        description: "",
        category: "",
        weight: "",
        attack: {phy: "", mag: "", fire: "", ligt: "", holy: "", crit: ""},
        defence: {phy: "", mag: "", fire: "", ligt: "", holy: "", boost: ""},
        scalesWith: [
            {name: "", scaling: ""},
            {name: "", scaling: ""},
        ],
        requiredAttributes: [
            {name: "", amount: ""},
            {name: "", amount: ""},
        ]
    })

    const [armorFormData, setArmorFormData] = useState({
        name: "",
        type: "",
        subtype: "",
        image: "",
        description: "",
        category: "",
        weight: "",
        dmgNegation: {
            phy: "",
            strike: "",
            slash: "",
            pierce: "",
            magic: "",
            fire: "",
            ligt: "",
            holy: "",
        },
        resistance: {immunity: "", robustness: "", focus: "", vitality: "", poise: ""},
    })

    const [talismanFormData, setTalismanFormData] = useState({
        name: "",
        type: "",
        image: "",
        description: "",
        effect: "",
    })


    // Mock saved builds data
    const [savedBuilds, setSavedBuilds] = useState([
        {
            id: 1,
            name: "Build Guerreiro",
            createdAt: "2024-01-15",
            weapons: ["Espada Longa", "Escudo de Ferro"],
            armor: ["Elmo de Ferro", "Armadura de Couro", "Calças de Ferro", "Luvas de Couro"],
            talismans: ["Talismã da Força", "Talismã da Resistência", null, null],
        },
        {
            id: 2,
            name: "Build Mago",
            createdAt: "2024-01-10",
            weapons: ["Cajado Mágico", null],
            armor: ["Capuz Místico", "Robe Arcano", "Calças Mágicas", "Luvas Encantadas"],
            talismans: ["Talismã da Magia", "Talismã da Agilidade", "Talismã da Sabedoria", null],
        },
    ])

    // Build slots state
    const [buildSlots, setBuildSlots] = useState({
        weapons: [null, null],
        armor: [null, null, null, null], // helm, chest, legs, gauntlets
        talismans: [null, null, null, null],
    })


    const [weaponForm, setWeaponForm] = useState({
        name: "",
        image: "",
        description: "",
        category: "",
        weight: "",
        attack: {
            phy: "",
            mag: "",
            fire: "",
            ligt: "",
            holy: "",
            crit: "",
        },
        defence: {
            phy: "",
            mag: "",
            fire: "",
            ligt: "",
            holy: "",
            boost: "",
        },
        scalesWith: [
            {name: "Str", scaling: ""},
            {name: "Dex", scaling: ""},
        ],
        requiredAttributes: [
            {name: "Str", amount: ""},
            {name: "Dex", amount: ""},
        ],
    })

    const [armorForm, setArmorForm] = useState({
        name: "",
        image: "",
        description: "",
        category: "",
        weight: "",
        dmgNegation: {
            phy: "",
            strike: "",
            slash: "",
            pierce: "",
            magic: "",
            fire: "",
            ligt: "",
            holy: "",
        },
        resistance: {
            immunity: "",
            robustness: "",
            focus: "",
            vitality: "",
            poise: "",
        },
    })

    const [talismanForm, setTalismanForm] = useState({
        name: "",
        image: "",
        description: "",
        effect: "",
    })

    const handleEditItem = (item: any) => {
        setEditingItem(item)
        if (item.type === "weapon") {
            setWeaponForm({
                name: item.name,
                image: item.image,
                description: item.description,
                category: item.category,
                weight: item.weight,
                attack: item.attack,
                defence: item.defence,
                scalesWith: item.scalesWith,
                requiredAttributes: item.requiredAttributes,
            })
        } else if (item.type === "armor") {
            setArmorForm({
                name: item.name,
                image: item.image,
                description: item.description,
                category: item.category,
                weight: item.weight,
                dmgNegation: item.dmgNegation,
                resistance: item.resistance,
            })
        } else if (item.type === "talisman") {
            setTalismanForm({
                name: item.name,
                image: item.image,
                description: item.description,
                effect: item.effect,
            })
        }
        setSelectedItemType(item.type)
        setEditDialogOpen(true)
    }

    const handleUpdateItem = () => {
        if (!editingItem) return

        const updatedItem = {
            ...editingItem,
            ...(editingItem.type === "weapon" ? weaponForm : editingItem.type === "armor" ? armorForm : talismanForm),
        }

        setItems((prev) => ({
            ...prev,
            [editingItem.type + "s"]: prev[editingItem.type + "s"].map((item) =>
                item.id === editingItem.id ? updatedItem : item,
            ),
        }))

        setEditDialogOpen(false)
        setEditingItem(null)
        // Reset forms
        setWeaponForm({
            name: "",
            image: "",
            description: "",
            category: "",
            weight: "",
            attack: {phy: "", mag: "", fire: "", ligt: "", holy: "", crit: ""},
            defence: {phy: "", mag: "", fire: "", ligt: "", holy: "", boost: ""},
            scalesWith: [
                {name: "Str", scaling: ""},
                {name: "Dex", scaling: ""},
            ],
            requiredAttributes: [
                {name: "Str", amount: ""},
                {name: "Dex", amount: ""},
            ],
        })
        setArmorForm({
            name: "",
            image: "",
            description: "",
            category: "",
            weight: "",
            dmgNegation: {phy: "", strike: "", slash: "", pierce: "", magic: "", fire: "", ligt: "", holy: ""},
            resistance: {immunity: "", robustness: "", focus: "", vitality: "", poise: ""},
        })
        setTalismanForm({name: "", image: "", description: "", effect: ""})
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value !== "" && value !== null && value !== undefined)
    );

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log("Sign in form submitted:", formData)

        try {
            const res = await fetch(`/api/admins/${decoded.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(filteredData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Falha ao atualizar usuário");
            }

            if(res.ok) {
                setEditDialogOpenEditUser(false)
            }

            router.push("/admin");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleDeleteItem = (item: any) => {
        if (confirm(`Tem certeza que deseja excluir "${item.name}"?`)) {
            setItems((prev) => ({
                ...prev,
                [item.type + "s"]: prev[item.type + "s"].filter((i) => i.id !== item.id),
            }))
        }
    }

    const handleDragStart = (e: React.DragEvent, item: any) => {
        setDraggedItem(item)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent, slotType: string, slotIndex: number) => {
        e.preventDefault()
        if (draggedItem && draggedItem.type === slotType) {
            setBuildSlots((prev) => ({
                ...prev,
                [slotType]: prev[slotType].map((slot, index) => (index === slotIndex ? draggedItem : slot)),
            }))
        }
        setDraggedItem(null)
    }

    const removeFromSlot = (slotType: string, slotIndex: number) => {
        setBuildSlots((prev) => ({
            ...prev,
            [slotType]: prev[slotType].map((slot, index) => (index === slotIndex ? null : slot)),
        }))
    }

    const getFilteredItems = () => {
        if (!selectedFilter) return []

        if (selectedFilter === "weapon") {
            return items.weapons
        } else if (selectedFilter === "armor") {
            return items.armor
        } else if (selectedFilter === "talisman") {
            return items.talismans
        } else if (["sword", "shield", "bow"].includes(selectedFilter)) {
            return items.weapons.filter((item) => item.subtype === selectedFilter)
        } else if (["helm", "chest", "legs", "gauntlets"].includes(selectedFilter)) {
            return items.armor.filter((item) => item.subtype === selectedFilter)
        }

        return []
    }

    const handleWeaponInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeaponFormData({
            ...weaponFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateWeapon = () => {
        e.preventDefault()
        // Handle form submission
        console.log("Sign in form submitted:", formData)

        try {
            const res = await fetch("/api/weapons", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Falha ao cadastrar");
            }

            router.push("/admin");
        } catch (err: any) {
            setError(err.message);
        }
        // Reset form
        setWeaponForm({
            name: "",
            image: "",
            description: "",
            category: "",
            weight: "",
            attack: {phy: "", mag: "", fire: "", ligt: "", holy: "", crit: ""},
            defence: {phy: "", mag: "", fire: "", ligt: "", holy: "", boost: ""},
            scalesWith: [
                {name: "Str", scaling: ""},
                {name: "Dex", scaling: ""},
            ],
            requiredAttributes: [
                {name: "Str", amount: ""},
                {name: "Dex", amount: ""},
            ],
        })
    }

    const handleCreateArmor = () => {
        const newArmor = {
            id: Date.now(),
            type: "armor",
            subtype: armorForm.category.toLowerCase().replace(" armor", "").replace(" ", ""),
            ...armorForm,
        }
        setItems((prev) => ({
            ...prev,
            armor: [...prev.armor, newArmor],
        }))
        // Reset form
        setArmorForm({
            name: "",
            image: "",
            description: "",
            category: "",
            weight: "",
            dmgNegation: {phy: "", strike: "", slash: "", pierce: "", magic: "", fire: "", ligt: "", holy: ""},
            resistance: {immunity: "", robustness: "", focus: "", vitality: "", poise: ""},
        })
    }

    const handleCreateTalisman = () => {
        const newTalisman = {
            id: Date.now(),
            type: "talisman",
            ...talismanForm,
        }
        setItems((prev) => ({
            ...prev,
            talismans: [...prev.talismans, newTalisman],
        }))
        // Reset form
        setTalismanForm({name: "", image: "", description: "", effect: ""})
    }

    return (
        <div className="min-h-screen" style={{backgroundColor: "#f0f2f5"}}>
            {/* Header */}
            <div className="w-full py-6 text-center text-white" style={{backgroundColor: "#7a1c1c"}}>
                <h1 className="text-3xl font-bold">Foul Tarnished - Admin</h1>
            </div>

            <div className="container mx-auto px-4 py-8">
                <Card className="w-full max-w-6xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center" style={{color: "#393939"}}>
                            Painel do Administrador
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="profile" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="profile">Perfil</TabsTrigger>
                                <TabsTrigger value="builds">Criar Build</TabsTrigger>
                                <TabsTrigger value="saved-builds">Minhas Builds</TabsTrigger>
                                <TabsTrigger value="create-items">Gerenciar Itens</TabsTrigger>
                            </TabsList>

                            {/* Profile Tab - Same as user */}
                            <TabsContent value="profile" className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-sm font-medium" style={{color: "#393939"}}>
                                            Nome
                                        </Label>
                                        <div className="mt-1 p-3 bg-gray-50 rounded-md border">{decoded.name}</div>
                                    </div>

                                    <div>
                                        <Label className="text-sm font-medium" style={{color: "#393939"}}>
                                            E-mail
                                        </Label>
                                        <div className="mt-1 p-3 bg-gray-50 rounded-md border">{decoded.email}</div>
                                    </div>

                                    <Dialog open={editDialogOpenEditUser} onOpenChange={setEditDialogOpenEditUser}>
                                        <DialogTrigger asChild>
                                            <Button
                                                className="w-full text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
                                                style={{backgroundColor: "#7a1c1c"}}
                                            >
                                                <Edit className="w-4 h-4 mr-2"/>
                                                Editar Perfil
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle style={{color: "#393939"}}>Editar Perfil</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="edit-name">Nome</Label>
                                                    <Input id="edit-name"
                                                           name="name"
                                                           value={formData.name}
                                                           onChange={handleInputChange}
                                                           className="mt-1"/>
                                                </div>

                                                <div>
                                                    <Label htmlFor="edit-email">E-mail</Label>
                                                    <Input id="edit-email"
                                                           type="email"
                                                           name="email"
                                                           value={formData.email}
                                                           onChange={handleInputChange}
                                                           className="mt-1"/>
                                                </div>

                                                <div>
                                                    <Label htmlFor="edit-password">Nova Senha</Label>
                                                    <div className="relative mt-1">
                                                        <Input
                                                            id="edit-password"
                                                            type={showPassword ? "text" : "password"}
                                                            name="password"
                                                            placeholder="Digite sua nova senha"
                                                            value={formData.password}
                                                            onChange={handleInputChange}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="h-4 w-4 text-gray-400"/>
                                                            ) : (
                                                                <Eye className="h-4 w-4 text-gray-400"/>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                                                    <div className="relative mt-1">
                                                        <Input
                                                            id="confirm-password"
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            placeholder="Confirme sua nova senha"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOff className="h-4 w-4 text-gray-400"/>
                                                            ) : (
                                                                <Eye className="h-4 w-4 text-gray-400"/>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                <Button
                                                    className="w-full text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
                                                    style={{backgroundColor: "#7a1c1c"}}
                                                    onClick={handleUpdateUser}
                                                >
                                                    Salvar Alterações
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </TabsContent>

                            {/* Build Creation Tab - Same as user */}
                            <TabsContent value="builds" className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Item Selection */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold" style={{color: "#393939"}}>
                                            Selecionar Itens
                                        </h3>

                                        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Escolha o tipo de item"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="weapon">Armas</SelectItem>
                                                <SelectItem value="sword">Espadas</SelectItem>
                                                <SelectItem value="shield">Escudos</SelectItem>
                                                <SelectItem value="bow">Arcos</SelectItem>
                                                <SelectItem value="armor">Armaduras</SelectItem>
                                                <SelectItem value="helm">Elmos</SelectItem>
                                                <SelectItem value="chest">Peitorais</SelectItem>
                                                <SelectItem value="legs">Perneiras</SelectItem>
                                                <SelectItem value="gauntlets">Luvas</SelectItem>
                                                <SelectItem value="talisman">Talismãs</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                                            {getFilteredItems().map((item) => (
                                                <div
                                                    key={item.id}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, item)}
                                                    className="p-3 bg-white border rounded-md cursor-move hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium">{item.name}</span>
                                                        <Badge variant="secondary">{item.subtype || item.type}</Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Build Slots */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold" style={{color: "#393939"}}>
                                            Sua Build
                                        </h3>

                                        {/* Weapons */}
                                        <div>
                                            <h4 className="font-medium mb-2">Armas (2)</h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {buildSlots.weapons.map((weapon, index) => (
                                                    <div
                                                        key={`weapon-${index}`}
                                                        onDragOver={handleDragOver}
                                                        onDrop={(e) => handleDrop(e, "weapon", index)}
                                                        className="h-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center relative bg-gray-50"
                                                    >
                                                        {weapon ? (
                                                            <div
                                                                className="flex items-center justify-between w-full px-2">
                                                                <span
                                                                    className="text-sm font-medium truncate">{weapon.name}</span>
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    onClick={() => removeFromSlot("weapon", index)}
                                                                    className="h-6 w-6 p-0"
                                                                >
                                                                    <Trash2 className="h-3 w-3"/>
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <Plus className="h-6 w-6 text-gray-400"/>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Armor */}
                                        <div>
                                            <h4 className="font-medium mb-2">Armaduras (4)</h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {buildSlots.armor.map((armor, index) => (
                                                    <div
                                                        key={`armor-${index}`}
                                                        onDragOver={handleDragOver}
                                                        onDrop={(e) => handleDrop(e, "armor", index)}
                                                        className="h-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center relative bg-gray-50"
                                                    >
                                                        {armor ? (
                                                            <div
                                                                className="flex items-center justify-between w-full px-2">
                                                                <span
                                                                    className="text-sm font-medium truncate">{armor.name}</span>
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    onClick={() => removeFromSlot("armor", index)}
                                                                    className="h-6 w-6 p-0"
                                                                >
                                                                    <Trash2 className="h-3 w-3"/>
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <Plus className="h-6 w-6 text-gray-400"/>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Talismans */}
                                        <div>
                                            <h4 className="font-medium mb-2">Talismãs (4)</h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {buildSlots.talismans.map((talisman, index) => (
                                                    <div
                                                        key={`talisman-${index}`}
                                                        onDragOver={handleDragOver}
                                                        onDrop={(e) => handleDrop(e, "talisman", index)}
                                                        className="h-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center relative bg-gray-50"
                                                    >
                                                        {talisman ? (
                                                            <div
                                                                className="flex items-center justify-between w-full px-2">
                                                                <span
                                                                    className="text-sm font-medium truncate">{talisman.name}</span>
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    onClick={() => removeFromSlot("talisman", index)}
                                                                    className="h-6 w-6 p-0"
                                                                >
                                                                    <Trash2 className="h-3 w-3"/>
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <Plus className="h-6 w-6 text-gray-400"/>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
                                            style={{backgroundColor: "#7a1c1c"}}
                                        >
                                            Salvar Build
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Saved Builds Tab - Same as user */}
                            <TabsContent value="saved-builds" className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold" style={{color: "#393939"}}>
                                        Builds Salvos
                                    </h3>

                                    {savedBuilds.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500">
                                            <p>Nenhum build salvo ainda.</p>
                                            <p className="text-sm mt-2">Crie seu primeiro build na aba "Criar
                                                Build"!</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {savedBuilds.map((build) => (
                                                <Card key={build.id}
                                                      className="border hover:shadow-md transition-shadow">
                                                    <CardHeader className="pb-3">
                                                        <div className="flex items-center justify-between">
                                                            <CardTitle className="text-lg" style={{color: "#393939"}}>
                                                                {build.name}
                                                            </CardTitle>
                                                            <div className="flex gap-2">
                                                                <Button size="sm" variant="ghost"
                                                                        className="h-8 w-8 p-0">
                                                                    <Edit className="h-4 w-4"/>
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                                                >
                                                                    <Trash2 className="h-4 w-4"/>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-500">
                                                            Criado
                                                            em: {new Date(build.createdAt).toLocaleDateString("pt-BR")}
                                                        </p>
                                                    </CardHeader>
                                                    <CardContent className="space-y-3">
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-700 mb-1">Armas:</h4>
                                                            <div className="flex flex-wrap gap-1">
                                                                {build.weapons.filter(Boolean).map((weapon, index) => (
                                                                    <Badge key={index} variant="secondary"
                                                                           className="text-xs">
                                                                        {weapon}
                                                                    </Badge>
                                                                ))}
                                                                {build.weapons.filter(Boolean).length === 0 && (
                                                                    <span
                                                                        className="text-xs text-gray-400">Nenhuma arma</span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-700 mb-1">Armaduras:</h4>
                                                            <div className="flex flex-wrap gap-1">
                                                                {build.armor.filter(Boolean).map((armor, index) => (
                                                                    <Badge key={index} variant="secondary"
                                                                           className="text-xs">
                                                                        {armor}
                                                                    </Badge>
                                                                ))}
                                                                {build.armor.filter(Boolean).length === 0 && (
                                                                    <span className="text-xs text-gray-400">Nenhuma armadura</span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-700 mb-1">Talismãs:</h4>
                                                            <div className="flex flex-wrap gap-1">
                                                                {build.talismans.filter(Boolean).map((talisman, index) => (
                                                                    <Badge key={index} variant="secondary"
                                                                           className="text-xs">
                                                                        {talisman}
                                                                    </Badge>
                                                                ))}
                                                                {build.talismans.filter(Boolean).length === 0 && (
                                                                    <span className="text-xs text-gray-400">Nenhum talismã</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="create-items" className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold" style={{color: "#393939"}}>
                                        Gerenciar Itens
                                    </h3>

                                    <Tabs defaultValue="create" className="w-full">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="create">Criar Itens</TabsTrigger>
                                            <TabsTrigger value="manage">Gerenciar Itens</TabsTrigger>
                                        </TabsList>

                                        {/* Create Items Sub-tab */}
                                        <TabsContent value="create" className="space-y-4">
                                            <Select value={selectedItemType} onValueChange={setSelectedItemType}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione o tipo de item para criar"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="weapon">
                                                        <div className="flex items-center gap-2">
                                                            <Sword className="h-4 w-4"/>
                                                            Arma
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="armor">
                                                        <div className="flex items-center gap-2">
                                                            <Shield className="h-4 w-4"/>
                                                            Armadura
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="talisman">
                                                        <div className="flex items-center gap-2">
                                                            <Gem className="h-4 w-4"/>
                                                            Talismã
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                            {/* Weapon Creation Form */}
                                            {selectedItemType === "weapon" && (
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center gap-2"
                                                                   style={{color: "#393939"}}>
                                                            <Sword className="h-5 w-5"/>
                                                            Criar Nova Arma
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <Label htmlFor="weapon-name">Nome</Label>
                                                                <Input
                                                                    id="weapon-name"
                                                                    value={weaponForm.name}
                                                                    onChange={(e) => setWeaponForm({
                                                                        ...weaponForm,
                                                                        name: e.target.value
                                                                    })}
                                                                    placeholder="Nome da arma"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="weapon-category">Categoria</Label>
                                                                <Select
                                                                    value={weaponForm.category}
                                                                    onValueChange={(value) => setWeaponForm({
                                                                        ...weaponForm,
                                                                        category: value
                                                                    })}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            placeholder="Selecione a categoria"/>
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="Dagger">Dagger</SelectItem>
                                                                        <SelectItem value="Straight Sword">Straight Sword</SelectItem>
                                                                        <SelectItem value="Greatsword">Greatsword</SelectItem>
                                                                        <SelectItem value="Colossal Sword">Colossal Sword</SelectItem>
                                                                        <SelectItem value="Thrusting Sword">Thrusting Sword</SelectItem>
                                                                        <SelectItem value="Heavy Thrusting Sword">Heavy Thrusting Sword</SelectItem>
                                                                        <SelectItem value="Katana">Curved Sword</SelectItem>
                                                                        <SelectItem value="Twinblades">Twinblades</SelectItem>
                                                                        <SelectItem value="Axes">Axes</SelectItem>
                                                                        <SelectItem value="Greataxes">Greataxes</SelectItem>
                                                                        <SelectItem value="Hammer">Hammer</SelectItem>
                                                                        <SelectItem value="Greathammer">Greathammer</SelectItem>
                                                                        <SelectItem value="Flail">Flail</SelectItem>
                                                                        <SelectItem value="Colossal Weapon">Colossal Weapon</SelectItem>
                                                                        <SelectItem value="Spear">Spear</SelectItem>
                                                                        <SelectItem value="Great Spear">Great Spear</SelectItem>
                                                                        <SelectItem value="Halberd">Halberd</SelectItem>
                                                                        <SelectItem value="Reaper">Reaper</SelectItem>
                                                                        <SelectItem value="Whip">Whip</SelectItem>
                                                                        <SelectItem value="Fist">Fist</SelectItem>
                                                                        <SelectItem value="Claw">Claw</SelectItem>
                                                                        <SelectItem value="Light Bow">Light Bow</SelectItem>
                                                                        <SelectItem value="Regular Bow">Regular bow</SelectItem>
                                                                        <SelectItem value="Greatbow">Greatbow</SelectItem>
                                                                        <SelectItem value="Crossbow">Crossbow</SelectItem>
                                                                        <SelectItem value="Ballista">Ballista</SelectItem>
                                                                        <SelectItem value="Glintstone Staff">Glintstone Staff</SelectItem>
                                                                        <SelectItem value="Sacred Seal">Sacred Seal</SelectItem>
                                                                        <SelectItem value="Torch">Torch</SelectItem>
                                                                        <SelectItem value="Small Shield">Small Shield</SelectItem>
                                                                        <SelectItem value="Medium-Sized Shield">Medium-Sized Shield</SelectItem>
                                                                        <SelectItem value="Greatshield">Greatshield</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="weapon-image">URL da Imagem</Label>
                                                            <Input
                                                                id="weapon-image"
                                                                name="image"
                                                                value={weaponFormData.image}
                                                                onChange={handleWeaponInputChange}
                                                                placeholder="https://exemplo.com/imagem.png"
                                                                required
                                                            />
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="weapon-description">Descrição</Label>
                                                            <Textarea
                                                                id="weapon-description"
                                                                name="description"
                                                                value={weaponFormData.description}
                                                                onChange={handleWeaponInputChange}
                                                                placeholder="Descrição da arma"
                                                                rows={3}
                                                                required
                                                            />
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="weapon-weight">Peso</Label>
                                                            <Input
                                                                id="weapon-weight"
                                                                type="number"
                                                                step="0.1"
                                                                value={weaponFormData.weight}
                                                                onChange={handleWeaponInputChange}
                                                                placeholder="3.5"
                                                                required
                                                            />
                                                        </div>

                                                        {/* Attack Stats */}
                                                        <div>
                                                            <Label className="text-base font-semibold">Ataque</Label>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                                                {Object.entries(weaponForm.attack).map(([key, value]) => (
                                                                    <div key={key}>
                                                                        <Label htmlFor={`attack-${key}`}
                                                                               className="text-xs">
                                                                            {key.toUpperCase()}
                                                                        </Label>
                                                                        <Input
                                                                            id={`attack-${key}`}
                                                                            type="number"
                                                                            value={value}
                                                                            onChange={handleWeaponInputChange

                                                                            }
                                                                            placeholder="0"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Defence Stats */}
                                                        <div>
                                                            <Label className="text-base font-semibold">Defesa</Label>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                                                {Object.entries(weaponForm.defence).map(([key, value]) => (
                                                                    <div key={key}>
                                                                        <Label htmlFor={`defence-${key}`}
                                                                               className="text-xs">
                                                                            {key.toUpperCase()}
                                                                        </Label>
                                                                        <Input
                                                                            id={`defence-${key}`}
                                                                            type="number"
                                                                            value={value}
                                                                            onChange={(e) =>
                                                                                setWeaponForm({
                                                                                    ...weaponForm,
                                                                                    defence: {
                                                                                        ...weaponForm.defence,
                                                                                        [key]: e.target.value
                                                                                    },
                                                                                })
                                                                            }
                                                                            placeholder="0"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Scaling */}
                                                        <div>
                                                            <Label
                                                                className="text-base font-semibold">Escalonamento</Label>
                                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                                                {weaponForm.scalesWith.map((scale, index) => (
                                                                    <div key={index} className="flex gap-2">
                                                                        <div className="flex-1">
                                                                            <Label
                                                                                className="text-xs">{scale.name}</Label>
                                                                            <Select
                                                                                value={scale.scaling}
                                                                                onValueChange={(value) => {
                                                                                    const newScales = [...weaponForm.scalesWith]
                                                                                    newScales[index].scaling = value
                                                                                    setWeaponForm({
                                                                                        ...weaponForm,
                                                                                        scalesWith: newScales
                                                                                    })
                                                                                }}
                                                                            >
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Rank"/>
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    <SelectItem value="S">S</SelectItem>
                                                                                    <SelectItem value="A">A</SelectItem>
                                                                                    <SelectItem value="B">B</SelectItem>
                                                                                    <SelectItem value="C">C</SelectItem>
                                                                                    <SelectItem value="D">D</SelectItem>
                                                                                    <SelectItem value="E">E</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Required Attributes */}
                                                        <div>
                                                            <Label className="text-base font-semibold">Atributos
                                                                Necessários</Label>
                                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                                                {weaponForm.requiredAttributes.map((attr, index) => (
                                                                    <div key={index}>
                                                                        <Label className="text-xs">{attr.name}</Label>
                                                                        <Input
                                                                            type="number"
                                                                            value={attr.amount}
                                                                            onChange={(e) => {
                                                                                const newAttrs = [...weaponForm.requiredAttributes]
                                                                                newAttrs[index].amount = e.target.value
                                                                                setWeaponForm({
                                                                                    ...weaponForm,
                                                                                    requiredAttributes: newAttrs
                                                                                })
                                                                            }}
                                                                            placeholder="0"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <Button
                                                            onClick={handleCreateWeapon}
                                                            className="w-full text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
                                                            style={{backgroundColor: "#7a1c1c"}}
                                                        >
                                                            Criar Arma
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            )}

                                            {/* Armor Creation Form */}
                                            {selectedItemType === "armor" && (
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center gap-2"
                                                                   style={{color: "#393939"}}>
                                                            <Shield className="h-5 w-5"/>
                                                            Criar Nova Armadura
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <Label htmlFor="armor-name">Nome</Label>
                                                                <Input
                                                                    id="armor-name"
                                                                    value={armorForm.name}
                                                                    onChange={(e) => setArmorForm({
                                                                        ...armorForm,
                                                                        name: e.target.value
                                                                    })}
                                                                    placeholder="Nome da armadura"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="armor-category">Categoria</Label>
                                                                <Select
                                                                    value={armorForm.category}
                                                                    onValueChange={(value) => setArmorForm({
                                                                        ...armorForm,
                                                                        category: value
                                                                    })}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            placeholder="Selecione a categoria"/>
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="Helm">Elmo</SelectItem>
                                                                        <SelectItem
                                                                            value="Chest Armor">Peitoral</SelectItem>
                                                                        <SelectItem value="Gauntlets">Luvas</SelectItem>
                                                                        <SelectItem
                                                                            value="Leg Armor">Perneiras</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="armor-image">URL da Imagem</Label>
                                                            <Input
                                                                id="armor-image"
                                                                value={armorForm.image}
                                                                onChange={(e) => setArmorForm({
                                                                    ...armorForm,
                                                                    image: e.target.value
                                                                })}
                                                                placeholder="https://exemplo.com/imagem.png"
                                                            />
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="armor-description">Descrição</Label>
                                                            <Textarea
                                                                id="armor-description"
                                                                value={armorForm.description}
                                                                onChange={(e) => setArmorForm({
                                                                    ...armorForm,
                                                                    description: e.target.value
                                                                })}
                                                                placeholder="Descrição da armadura"
                                                                rows={3}
                                                            />
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="armor-weight">Peso</Label>
                                                            <Input
                                                                id="armor-weight"
                                                                type="number"
                                                                step="0.1"
                                                                value={armorForm.weight}
                                                                onChange={(e) => setArmorForm({
                                                                    ...armorForm,
                                                                    weight: e.target.value
                                                                })}
                                                                placeholder="10.6"
                                                            />
                                                        </div>

                                                        {/* Damage Negation */}
                                                        <div>
                                                            <Label className="text-base font-semibold">Negação de
                                                                Dano</Label>
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                                                {Object.entries(armorForm.dmgNegation).map(([key, value]) => (
                                                                    <div key={key}>
                                                                        <Label htmlFor={`dmg-${key}`}
                                                                               className="text-xs">
                                                                            {key.toUpperCase()}
                                                                        </Label>
                                                                        <Input
                                                                            id={`dmg-${key}`}
                                                                            type="number"
                                                                            value={value}
                                                                            onChange={(e) =>
                                                                                setArmorForm({
                                                                                    ...armorForm,
                                                                                    dmgNegation: {
                                                                                        ...armorForm.dmgNegation,
                                                                                        [key]: e.target.value
                                                                                    },
                                                                                })
                                                                            }
                                                                            placeholder="0"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Resistance */}
                                                        <div>
                                                            <Label
                                                                className="text-base font-semibold">Resistência</Label>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                                                {Object.entries(armorForm.resistance).map(([key, value]) => (
                                                                    <div key={key}>
                                                                        <Label htmlFor={`res-${key}`}
                                                                               className="text-xs">
                                                                            {key.toUpperCase()}
                                                                        </Label>
                                                                        <Input
                                                                            id={`res-${key}`}
                                                                            type="number"
                                                                            value={value}
                                                                            onChange={(e) =>
                                                                                setArmorForm({
                                                                                    ...armorForm,
                                                                                    resistance: {
                                                                                        ...armorForm.resistance,
                                                                                        [key]: e.target.value
                                                                                    },
                                                                                })
                                                                            }
                                                                            placeholder="0"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <Button
                                                            onClick={handleCreateArmor}
                                                            className="w-full text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
                                                            style={{backgroundColor: "#7a1c1c"}}
                                                        >
                                                            Criar Armadura
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            )}

                                            {/* Talisman Creation Form */}
                                            {selectedItemType === "talisman" && (
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center gap-2"
                                                                   style={{color: "#393939"}}>
                                                            <Gem className="h-5 w-5"/>
                                                            Criar Novo Talismã
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <div>
                                                            <Label htmlFor="talisman-name">Nome</Label>
                                                            <Input
                                                                id="talisman-name"
                                                                value={talismanForm.name}
                                                                onChange={(e) => setTalismanForm({
                                                                    ...talismanForm,
                                                                    name: e.target.value
                                                                })}
                                                                placeholder="Nome do talismã"
                                                            />
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="talisman-image">URL da Imagem</Label>
                                                            <Input
                                                                id="talisman-image"
                                                                value={talismanForm.image}
                                                                onChange={(e) => setTalismanForm({
                                                                    ...talismanForm,
                                                                    image: e.target.value
                                                                })}
                                                                placeholder="https://exemplo.com/imagem.png"
                                                            />
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="talisman-description">Descrição</Label>
                                                            <Textarea
                                                                id="talisman-description"
                                                                value={talismanForm.description}
                                                                onChange={(e) => setTalismanForm({
                                                                    ...talismanForm,
                                                                    description: e.target.value
                                                                })}
                                                                placeholder="Descrição do talismã"
                                                                rows={3}
                                                            />
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="talisman-effect">Efeito</Label>
                                                            <Textarea
                                                                id="talisman-effect"
                                                                value={talismanForm.effect}
                                                                onChange={(e) => setTalismanForm({
                                                                    ...talismanForm,
                                                                    effect: e.target.value
                                                                })}
                                                                placeholder="Efeito do talismã"
                                                                rows={2}
                                                            />
                                                        </div>

                                                        <Button
                                                            onClick={handleCreateTalisman}
                                                            className="w-full text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
                                                            style={{backgroundColor: "#7a1c1c"}}
                                                        >
                                                            Criar Talismã
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </TabsContent>

                                        <TabsContent value="manage" className="space-y-4">
                                            <div className="space-y-6">
                                                {/* Weapons Management */}
                                                <div>
                                                    <h4
                                                        className="text-lg font-semibold mb-3 flex items-center gap-2"
                                                        style={{color: "#393939"}}
                                                    >
                                                        <Sword className="h-5 w-5"/>
                                                        Armas ({items.weapons.length})
                                                    </h4>
                                                    <div
                                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                        {items.weapons.map((weapon) => (
                                                            <Card key={weapon.id}
                                                                  className="border hover:shadow-md transition-shadow">
                                                                <CardHeader className="pb-2">
                                                                    <div className="flex items-center justify-between">
                                                                        <CardTitle className="text-base"
                                                                                   style={{color: "#393939"}}>
                                                                            {weapon.name}
                                                                        </CardTitle>
                                                                        <div className="flex gap-1">
                                                                            <Button
                                                                                size="sm"
                                                                                variant="ghost"
                                                                                className="h-8 w-8 p-0"
                                                                                onClick={() => handleEditItem(weapon)}
                                                                            >
                                                                                <Edit className="h-4 w-4"/>
                                                                            </Button>
                                                                            <Button
                                                                                size="sm"
                                                                                variant="ghost"
                                                                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                                                                onClick={() => handleDeleteItem(weapon)}
                                                                            >
                                                                                <Trash2 className="h-4 w-4"/>
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </CardHeader>
                                                                <CardContent className="pt-0">
                                                                    <div className="space-y-2">
                                                                        <Badge variant="secondary" className="text-xs">
                                                                            {weapon.category}
                                                                        </Badge>
                                                                        <p className="text-sm text-gray-600 line-clamp-2">{weapon.description}</p>
                                                                        <div
                                                                            className="text-xs text-gray-500">Peso: {weapon.weight}</div>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Armor Management */}
                                                <div>
                                                    <h4
                                                        className="text-lg font-semibold mb-3 flex items-center gap-2"
                                                        style={{color: "#393939"}}
                                                    >
                                                        <Shield className="h-5 w-5"/>
                                                        Armaduras ({items.armor.length})
                                                    </h4>
                                                    <div
                                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                        {items.armor.map((armor) => (
                                                            <Card key={armor.id}
                                                                  className="border hover:shadow-md transition-shadow">
                                                                <CardHeader className="pb-2">
                                                                    <div className="flex items-center justify-between">
                                                                        <CardTitle className="text-base"
                                                                                   style={{color: "#393939"}}>
                                                                            {armor.name}
                                                                        </CardTitle>
                                                                        <div className="flex gap-1">
                                                                            <Button
                                                                                size="sm"
                                                                                variant="ghost"
                                                                                className="h-8 w-8 p-0"
                                                                                onClick={() => handleEditItem(armor)}
                                                                            >
                                                                                <Edit className="h-4 w-4"/>
                                                                            </Button>
                                                                            <Button
                                                                                size="sm"
                                                                                variant="ghost"
                                                                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                                                                onClick={() => handleDeleteItem(armor)}
                                                                            >
                                                                                <Trash2 className="h-4 w-4"/>
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </CardHeader>
                                                                <CardContent className="pt-0">
                                                                    <div className="space-y-2">
                                                                        <Badge variant="secondary" className="text-xs">
                                                                            {armor.category}
                                                                        </Badge>
                                                                        <p className="text-sm text-gray-600 line-clamp-2">{armor.description}</p>
                                                                        <div
                                                                            className="text-xs text-gray-500">Peso: {armor.weight}</div>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Talismans Management */}
                                                <div>
                                                    <h4
                                                        className="text-lg font-semibold mb-3 flex items-center gap-2"
                                                        style={{color: "#393939"}}
                                                    >
                                                        <Gem className="h-5 w-5"/>
                                                        Talismãs ({items.talismans.length})
                                                    </h4>
                                                    <div
                                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                        {items.talismans.map((talisman) => (
                                                            <Card key={talisman.id}
                                                                  className="border hover:shadow-md transition-shadow">
                                                                <CardHeader className="pb-2">
                                                                    <div className="flex items-center justify-between">
                                                                        <CardTitle className="text-base"
                                                                                   style={{color: "#393939"}}>
                                                                            {talisman.name}
                                                                        </CardTitle>
                                                                        <div className="flex gap-1">
                                                                            <Button
                                                                                size="sm"
                                                                                variant="ghost"
                                                                                className="h-8 w-8 p-0"
                                                                                onClick={() => handleEditItem(talisman)}
                                                                            >
                                                                                <Edit className="h-4 w-4"/>
                                                                            </Button>
                                                                            <Button
                                                                                size="sm"
                                                                                variant="ghost"
                                                                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                                                                onClick={() => handleDeleteItem(talisman)}
                                                                            >
                                                                                <Trash2 className="h-4 w-4"/>
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </CardHeader>
                                                                <CardContent className="pt-0">
                                                                    <div className="space-y-2">
                                                                        <p className="text-sm text-gray-600 line-clamp-2">{talisman.description}</p>
                                                                        <div
                                                                            className="text-xs text-gray-500">Efeito: {talisman.effect}</div>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle style={{color: "#393939"}}>
                            Editar {editingItem?.type === "weapon" ? "Arma" : editingItem?.type === "armor" ? "Armadura" : "Talismã"}
                        </DialogTitle>
                    </DialogHeader>

                    {/* Reuse the same forms from creation but for editing */}
                    {editingItem?.type === "weapon" && (
                        <div className="space-y-4">
                            {/* Same weapon form as in creation */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="edit-weapon-name">Nome</Label>
                                    <Input
                                        id="edit-weapon-name"
                                        name="name"
                                        value={weaponFormData.name}
                                        onChange={handleWeaponInputChange}
                                        placeholder="Nome da arma"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="edit-weapon-category">Categoria</Label>
                                    <Select
                                        value={weaponForm.category}
                                        onValueChange={(value) => setWeaponForm({...weaponForm, category: value})}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a categoria"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Straight Sword">Espada Reta</SelectItem>
                                            <SelectItem value="Medium Shield">Escudo Médio</SelectItem>
                                            <SelectItem value="Bow">Arco</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="edit-weapon-description">Descrição</Label>
                                <Textarea
                                    id="edit-weapon-description"
                                    value={weaponForm.description}
                                    onChange={(e) => setWeaponForm({...weaponForm, description: e.target.value})}
                                    placeholder="Descrição da arma"
                                    rows={3}
                                />
                            </div>

                            <Button
                                onClick={handleUpdateItem}
                                className="w-full text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
                                style={{backgroundColor: "#7a1c1c"}}
                            >
                                Atualizar Arma
                            </Button>
                        </div>
                    )}

                    {editingItem?.type === "armor" && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="edit-armor-name">Nome</Label>
                                    <Input
                                        id="edit-armor-name"
                                        value={armorForm.name}
                                        onChange={(e) => setArmorForm({...armorForm, name: e.target.value})}
                                        placeholder="Nome da armadura"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="edit-armor-category">Categoria</Label>
                                    <Select
                                        value={armorForm.category}
                                        onValueChange={(value) => setArmorForm({...armorForm, category: value})}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a categoria"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Helm">Elmo</SelectItem>
                                            <SelectItem value="Chest Armor">Peitoral</SelectItem>
                                            <SelectItem value="Gauntlets">Luvas</SelectItem>
                                            <SelectItem value="Leg Armor">Perneiras</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="edit-armor-description">Descrição</Label>
                                <Textarea
                                    id="edit-armor-description"
                                    value={armorForm.description}
                                    onChange={(e) => setArmorForm({...armorForm, description: e.target.value})}
                                    placeholder="Descrição da armadura"
                                    rows={3}
                                />
                            </div>

                            <Button
                                onClick={handleUpdateItem}
                                className="w-full text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
                                style={{backgroundColor: "#7a1c1c"}}
                            >
                                Atualizar Armadura
                            </Button>
                        </div>
                    )}

                    {editingItem?.type === "talisman" && (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="edit-talisman-name">Nome</Label>
                                <Input
                                    id="edit-talisman-name"
                                    value={talismanForm.name}
                                    onChange={(e) => setTalismanForm({...talismanForm, name: e.target.value})}
                                    placeholder="Nome do talismã"
                                />
                            </div>

                            <div>
                                <Label htmlFor="edit-talisman-description">Descrição</Label>
                                <Textarea
                                    id="edit-talisman-description"
                                    value={talismanForm.description}
                                    onChange={(e) => setTalismanForm({...talismanForm, description: e.target.value})}
                                    placeholder="Descrição do talismã"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="edit-talisman-effect">Efeito</Label>
                                <Textarea
                                    id="edit-talisman-effect"
                                    value={talismanForm.effect}
                                    onChange={(e) => setTalismanForm({...talismanForm, effect: e.target.value})}
                                    placeholder="Efeito do talismã"
                                    rows={2}
                                />
                            </div>

                            <Button
                                onClick={handleUpdateItem}
                                className="w-full text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
                                style={{backgroundColor: "#7a1c1c"}}
                            >
                                Atualizar Talismã
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
